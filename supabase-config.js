// Supabase configuration
const SUPABASE_URL = 'https://nytvnmhoiuutmqcoymif.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dHZubWhvaXV1dG1xY295bWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4OTk3OTUsImV4cCI6MjA2NzQ3NTc5NX0.6bhZk7ccrjIl0b4anD_DfYPNiBj4wwU5hcpZ37VOrrE';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Newsletter subscription function
async function subscribeToNewsletter(email) {
    try {
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert([
                { 
                    email: email,
                    active: true 
                }
            ])
            .select();

        if (error) {
            // Handle duplicate email error gracefully
            if (error.code === '23505') {
                return { 
                    success: false, 
                    error: 'This email is already subscribed to our newsletter.',
                    code: 'DUPLICATE_EMAIL'
                };
            }
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return { 
            success: false, 
            error: 'Failed to subscribe. Please try again later.',
            code: 'NETWORK_ERROR'
        };
    }
}

// Function to check if email is already subscribed
async function checkEmailSubscription(email) {
    try {
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('email, active')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            throw error;
        }

        return { exists: !!data, active: data?.active || false };
    } catch (error) {
        console.error('Email check error:', error);
        return { exists: false, active: false };
    }
}
