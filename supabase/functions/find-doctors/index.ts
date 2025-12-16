import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, specialty } = await req.json();
    
    console.log(`Searching for ${specialty || 'dermatologists'} near ${location}`);

    // Mock data for demonstration - in production, integrate with a real API
    const mockDoctors = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialty: specialty || 'Dermatology',
        address: `123 Medical Center Dr, ${location}`,
        phone: '(555) 123-4567',
        rating: 4.8,
        distance: '0.5 miles',
        availability: 'Available today'
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: specialty || 'Dermatology',
        address: `456 Health Plaza, ${location}`,
        phone: '(555) 234-5678',
        rating: 4.9,
        distance: '1.2 miles',
        availability: 'Next available: Tomorrow'
      },
      {
        id: '3',
        name: 'Dr. Emily Williams',
        specialty: specialty || 'Dermatology',
        address: `789 Wellness Blvd, ${location}`,
        phone: '(555) 345-6789',
        rating: 4.7,
        distance: '2.0 miles',
        availability: 'Available this week'
      }
    ];

    return new Response(JSON.stringify({ doctors: mockDoctors }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in find-doctors function:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
