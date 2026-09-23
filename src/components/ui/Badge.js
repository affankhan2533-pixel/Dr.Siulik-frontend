export default function Badge({ children, icon: Icon, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-soft text-brand-deep border border-brand-primary/20 ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 text-brand-primary" />}
      {children}
    </span>
  );
}
