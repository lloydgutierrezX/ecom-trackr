import { Component, Input } from '@angular/core';
import { LucideAngularModule, BanknoteArrowDown, CircleGauge, HandCoins, Settings, Blocks, UserCog, Box, UserRound, LogOut, Edit, Trash2, Search, ShieldCheck, ShieldX, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './icons.component.html'
})
export class IconsComponent {
  @Input() name = "";
  @Input() class? = "";

  readonly BanknoteArrowDown = BanknoteArrowDown;
  readonly CircleGauge = CircleGauge;
  readonly HandCoins = HandCoins;
  readonly Settings = Settings;
  readonly Blocks = Blocks;
  readonly UserCog = UserCog;
  readonly Box = Box;
  readonly UserRound = UserRound;
  readonly Logout = LogOut;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Search = Search;
  readonly ShieldCheck = ShieldCheck;
  readonly ShieldX = ShieldX;
  readonly ChevronFirst = ChevronFirst;
  readonly ChevronLast = ChevronLast;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
}
