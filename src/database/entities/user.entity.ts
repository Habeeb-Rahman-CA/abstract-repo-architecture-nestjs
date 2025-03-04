import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ schema: 'purchase', name: 'user' })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:25})
  name: string;

  @Column('varchar',{length:100,unique:true})
  email: string;

  @Column('varchar',{length:100})
  password: string;

  @Column({default:true})
  is_active: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({default:false})
  is_delete: boolean;

  // Foreign key for createdBy
  @ManyToOne(() => User, { onDelete: 'SET NULL' ,nullable: true})
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  // Foreign key for createdBy
  @ManyToOne(() => User, { onDelete: 'SET NULL',nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;
}
