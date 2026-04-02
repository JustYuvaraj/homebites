import { ChefHat, Heart, Clock, Award, Users, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ChefHat className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About HomeBites</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Where homemade goodness meets your doorstep. Experience authentic 
            home-cooked meals made with love and delivered fresh.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                HomeBites started from a simple kitchen with a big dream – to share the warmth 
                of home-cooked food with everyone who misses that authentic taste of homemade meals.
              </p>
              <p>
                What began as cooking for family and friends has grown into a passion to serve 
                our community. Every dish is prepared with the same love and care as cooking 
                for our own family.
              </p>
              <p>
                We believe that good food has the power to bring joy, comfort, and connection. 
                That's why we use only fresh ingredients, traditional recipes, and cook everything 
                in small batches to ensure quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">What Makes Us Special</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Made with Love</h3>
              <p className="text-gray-600">
                Every dish is prepared with the same care and affection as cooking for family.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">
                We source the freshest ingredients daily to ensure the best taste and quality.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Timely Delivery</h3>
              <p className="text-gray-600">
                Hot, fresh food delivered to your doorstep within 30-45 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-orange-200">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2000+</div>
                <div className="text-orange-200">Orders Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.8</div>
                <div className="text-orange-200">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-orange-200">Signature Dishes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Taste the Difference?</h2>
          <p className="text-gray-600 mb-8">
            Order now and experience the joy of authentic home-cooked meals.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            <ChefHat className="h-5 w-5" />
            Explore Menu
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
