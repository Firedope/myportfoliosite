import { Star } from "lucide-react";
import StarRating from "@/components/ui/star-rating";

type Testimonial = {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote: "This newsletter has transformed my investment strategy. The in-depth analysis and exclusive insights have given me a competitive edge that's directly impacted my portfolio's performance.",
    authorName: "Sarah J.",
    authorTitle: "Investment Advisor, New York",
    authorImage: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5
  },
  {
    quote: "Our entire team subscribes to this newsletter. The enterprise plan gives us access to customized reports that align perfectly with our industry needs. It's become an essential part of our strategy meetings.",
    authorName: "Robert T.",
    authorTitle: "CEO, Tech Innovations",
    authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5
  },
  {
    quote: "As a startup founder, I'm always looking for ways to stay ahead of industry trends. This newsletter delivers insights I can't find elsewhere, with practical advice I can implement immediately. Worth every penny.",
    authorName: "Lisa M.",
    authorTitle: "Founder, Startup Ventures",
    authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <div id="testimonials" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by professionals worldwide
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Hear what our subscribers have to say about our content.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src={testimonial.authorImage} 
                    alt={`${testimonial.authorName}'s profile photo`} 
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.authorName}</p>
                    <p className="text-sm text-gray-500">{testimonial.authorTitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
