import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne
} from 'typeorm';

@Entity('sweeps')
export class Sweep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  file1: string;

  @Column({ type: 'text', nullable: true })
  file2: string;

  @Column({ type: 'text', nullable: true })
  file3: string;

  @Column({ type: 'text', nullable: true })
  file4: string;

  @Column({ type: 'text', nullable: true })
  file5: string;

  @Column({ type: 'text', nullable: true })
  file6: string;

  @ManyToOne(() => User, (eta) => eta.sweeps)
  influencer: Promise<User>;

  @OneToOne(() => User, (eta) => eta.sweeps)
  winner: Promise<User>;
}
