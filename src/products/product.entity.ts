import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, transformer: {
    to: (value?: number) => value,
    from: (value: string) => (value !== null ? parseFloat(value) : null),
  } })
  precio!: number;

  @Column({ type: 'int' })
  stock!: number;
}
