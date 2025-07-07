import { Component, Input } from '@angular/core';
import { LucideAngularModule, BanknoteArrowDown, CircleGauge, HandCoins, Settings, Blocks, UserCog, Box } from 'lucide-angular';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './icons.component.html'
})
export class IconsComponent {
  @Input() name = '';

  readonly BanknoteArrowDown = BanknoteArrowDown;
  readonly CircleGauge = CircleGauge;
  readonly HandCoins = HandCoins;
  readonly Settings = Settings;
  readonly Blocks = Blocks;
  readonly UserCog = UserCog;
  readonly Box = Box;

}
