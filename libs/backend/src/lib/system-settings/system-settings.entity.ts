import { Entity, Column, Check, PrimaryColumn } from 'typeorm';

@Entity('systemSettings')
@Check(`id = 1`)
export class SystemSettingsEntity {
  @PrimaryColumn({ type: 'int', default: () => `1`, nullable: false })
  public id: 1;

  @Column({ default: 'background.png' })
  background!: string;
}
