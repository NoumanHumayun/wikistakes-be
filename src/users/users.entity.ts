import { Blog } from 'src/blogs/blogs.entity';
import { Sweep } from 'src/sweeps/sweeps.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  firstName: string;

  @Column({ type: 'text', nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  state: string;

  @Column({ type: 'text', nullable: true })
  zip: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  country: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'text', default: 'user' })
  role: string;

  @Column({ type: 'text' })
  social1: string;

  @Column({ type: 'text', nullable: true })
  socialType1: string;

  @Column({ type: 'text', nullable: true })
  social2: string;

  @Column({ type: 'text', nullable: true })
  socialType2: string;

  @Column({ type: 'text', nullable: true })
  bank: string;

  @Column({ type: 'text', nullable: true })
  aba: string;

  @Column({ type: 'text', nullable: true })
  account: string;

  @OneToMany(() => Sweep, (eta) => eta.influencer)
  sweeps: Promise<Sweep[]>;

  @OneToMany(() => Blog, (eta) => eta.author)
  blogs: Promise<Blog[]>;
}
