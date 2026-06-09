import FeatureCard from "./FeatureCard";
import { FaCar, FaUsers, FaShieldAlt } from "react-icons/fa";

function Features() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why CampusCommute?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

       <FeatureCard
  icon={<FaCar />}
  title="Offer Ride"
  description="Share empty seats and reduce travel costs."
/>

        <FeatureCard
          icon={<FaUsers />}
          title="Join Pools"
          description="Coordinate Uber and auto rides with classmates."
        />

        <FeatureCard
          icon={<FaShieldAlt />}
          title="Verified Students"
          description="Only NIE verified students can access the platform."
        />

      </div>
    </section>
  );
}

export default Features;