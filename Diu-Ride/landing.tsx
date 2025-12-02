import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Bike, 
  Shield, 
  DollarSign, 
  Leaf, 
  Star,
  ChevronRight,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Bike className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DIU RideMate</h1>
                <p className="text-xs text-gray-500">Daffodil International University</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Share Your Ride.<br />
                <span className="text-green-600">Save Your Time.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A ride-sharing app for sharing bikes with other students and faculty at Daffodil International University.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-48 h-48 bg-green-200 rounded-full flex items-center justify-center">
                        <Bike className="h-24 w-24 text-green-600" />
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to share your ride</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Post a Ride</h3>
              <p className="text-gray-600">Post cio any way</p>
            </div>
            
            <div className="text-center relative">
              <div className="hidden md:block absolute top-10 -left-12 text-gray-300">
                <ChevronRight className="h-8 w-8" />
              </div>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Join a Ride</h3>
              <p className="text-gray-600">Share an riap plan</p>
            </div>
            
            <div className="text-center relative">
              <div className="hidden md:block absolute top-10 -left-12 text-gray-300">
                <ChevronRight className="h-8 w-8" />
              </div>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bike className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Arrive Together</h3>
              <p className="text-gray-600">Eaway's together</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Why Choose<br />
                <span className="text-green-600">DIU RideMate</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety</h3>
                    <p className="text-gray-600">Safe</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cost Sharing</h3>
                    <p className="text-gray-600">Cost affordable</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
                    <p className="text-gray-600">Community</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Environment</h3>
                    <p className="text-gray-600">Environment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Testimonials</h2>
              
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl text-green-600">"</div>
                    <div>
                      <p className="text-lg text-gray-700 mb-4">
                        Using DIU RideMate has been a great experience! It's convenient and affordable.
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-gray-600">- Sarah K.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQs</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Is DIU RideMate safe?</h3>
              <p className="text-gray-600">
                Yes, we ensure safety by verifying riders and providing secure rides.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How much does it cost?</h3>
              <p className="text-gray-600">
                Costs are shared among riders, making it affordable for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Who can use this service?</h3>
              <p className="text-gray-600">
                All DIU students and faculty members can use our ride-sharing service.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How do I get started?</h3>
              <p className="text-gray-600">
                Simply sign up with your DIU credentials and start sharing rides!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of DIU students already sharing rides
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Bike className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold">DIU RideMate</span>
              </div>
              <p className="text-gray-400">
                Connecting DIU community through safe and affordable ride sharing.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-white">Get Started</Link></li>
                <li><Link href="/" className="hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Download App</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800">
                  <span className="mr-2">📱</span>
                  Google Play
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800">
                  <span className="mr-2">🍎</span>
                  App Store
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DIU RideMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}