import { User } from 'src/users/users.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  publishDate: Date;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => User, (eta) => eta.blogs)
  author: Promise<User>;
}
