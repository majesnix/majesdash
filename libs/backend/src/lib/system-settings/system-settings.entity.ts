import { Check, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('systemSettings')
@Check(`id = 1`)
export class SystemSettingsEntity {
  @PrimaryColumn({ type: 'int', default: () => `1`, nullable: false })
  public id: 1;

  @Column({ default: 'background.png' })
  background!: string;

  @Column({ default: false })
  initialized!: boolean;

  @Column({ default: false })
  weatherWidget!: boolean;

  @Column({ nullable: true })
  weatherWidgetApiKey: string;

  @Column({ nullable: true })
  weatherWidgetTown: string;
}
