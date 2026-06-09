function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-green-500 transition">
     <div className="text-3xl mb-4 text-green-400">
  {icon}
</div>

      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;