import styles from './DemoSection.module.css';

type Props = {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function DemoSection({ id, title, description, children }: Props) {
  return (
    <section id={id} className={styles.section}>
      <h2 className="mono">{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.demo}>
        {children}
      </div>
    </section>
  );
}
