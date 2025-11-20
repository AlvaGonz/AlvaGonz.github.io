import { motion } from 'framer-motion';
import { organizations } from '../content/education';

export function OrganizationsSection(): JSX.Element {
  if (organizations.length === 0) return <></>;

  return (
    <div className="grid gap-4">
      {organizations.map((org) => (
        <motion.div
          key={org.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-rich-black/40 p-4 rounded-lg border border-white/5 flex justify-between items-center hover:border-primary-mountain-meadow/30 transition-colors"
        >
          <span className="font-medium text-primary-anti-flash-white">{org.name}</span>
          <span className="text-sm text-secondary-stone">{org.period}</span>
        </motion.div>
      ))}
    </div>
  );
}

