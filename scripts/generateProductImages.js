// This script will help generate product images using AI services and upload them to Supabase
// You'll need to install the Replicate API client: npm install replicate dotenv

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const replicate = require('replicate');

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Initialize Replicate client (for Stable Diffusion)
const replicateClient = new replicate.Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Product image prompts - optimized for Stable Diffusion
const productPrompts = {
  'Ultra Boost AI': 'hyper-realistic studio photography of advanced futuristic running shoes, crisp white with blue accents, athletic footwear on white background, product shot, detailed knit texture, professional lighting',
  
  'Cloudfoam Striker': 'premium sports footwear product shot, lightweight gray training shoes with cloud-like cushioning, minimalist modern design, studio lighting, isolated on white background, photorealistic',
  
  'Terrex Trail Pro': 'professional product photography of rugged trail running shoes, aggressive sole pattern, waterproof hiking footwear, earth tones with orange accents, outdoor adventure equipment, detailed texture, studio shot',
  
  'Predator Elite': 'premium black and red professional soccer cleats, sleek design, precision engineering, studio product photography on dark background, dramatic lighting, high-end sports equipment',
  
  'TechFit Training Tee': 'athletic compression shirt in navy blue, moisture-wicking fabric texture visible, sportswear product photography, mannequin display, studio lighting, professional sports apparel',
  
  'AeroReady Track Jacket': 'lightweight running jacket in black with reflective details, technical sportswear, zip-up design, water-resistant athletic outerwear, studio product photography, white background',
  
  'Pro Performance Shorts': 'black athletic shorts with subtle logo, four-way stretch fabric, professional sports apparel photography, clean background, technical sportswear, mannequin display',
  
  'Elite Training Ball': 'professional soccer ball product photography, black and white with geometric panel design, premium sports equipment, studio lighting on dark background',
  
  'Performance Backpack': 'modern athletic backpack with multiple compartments, black with subtle logo, water-resistant fabric, sports equipment bag, professional product photography',
  
  'Heritage Originals Sneakers': 'retro-inspired casual sneakers, vintage sportswear design with modern touches, white with three stripes in blue, iconic footwear, professional product photography'
};

// Function to download an image from a URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', reject);
  });
}

// Function to upload image to Supabase Storage
async function uploadImageToSupabase(filepath, filename) {
  try {
    const fileBuffer = fs.readFileSync(filepath);
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('products')
      .upload(filename, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(filename);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
}

// Function to update product in database with new image URL
async function updateProductImageUrl(productName, imageUrl) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ image_url: imageUrl })
      .eq('name', productName);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error updating product ${productName}:`, error);
    return false;
  }
}

// Main function to generate images for all products
async function generateProductImages() {
  // Create images directory if it doesn't exist
  const publicImagesDir = path.join(__dirname, '..', 'public', 'images', 'products');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // Get all products
  const { data: products, error } = await supabase
    .from('products')
    .select('name');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  // Process each product
  for (const product of products) {
    if (!productPrompts[product.name]) {
      console.log(`No prompt defined for ${product.name}, skipping...`);
      continue;
    }

    console.log(`Generating image for ${product.name}...`);
    try {
      // Generate image with Stable Diffusion via Replicate
      const result = await replicateClient.run(
        "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
        {
          input: {
            prompt: productPrompts[product.name],
            width: 1024,
            height: 1024,
            num_outputs: 1,
            guidance_scale: 7.5,
            num_inference_steps: 50,
          }
        }
      );

      const imageUrl = result[0]; // Get the first image URL
      
      // Define local file path
      const filename = `${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      const filepath = path.join(publicImagesDir, filename);
      
      // Download the generated image
      console.log(`Downloading image for ${product.name}...`);
      await downloadImage(imageUrl, filepath);
      
      // Upload to Supabase storage
      console.log(`Uploading image for ${product.name} to Supabase...`);
      const publicUrl = await uploadImageToSupabase(filepath, filename);
      
      // Update product with new image URL
      console.log(`Updating ${product.name} with new image URL...`);
      await updateProductImageUrl(product.name, `/images/products/${filename}`);
      
      console.log(`✅ Successfully processed ${product.name}`);
    } catch (error) {
      console.error(`Error processing ${product.name}:`, error);
    }
  }
}

// Run the generator
generateProductImages()
  .then(() => console.log('All product images generated and uploaded successfully!'))
  .catch(error => console.error('Error generating product images:', error));
