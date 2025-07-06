import { Component } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

type ITheme = 'cupcake' | 'dim';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './theme.component.html'
})

export class ThemeComponent {
  readonly Moon = Moon;
  readonly Sun = Sun;

  theme: ITheme = ((): ITheme => {
    const stored = localStorage.getItem('theme');
    return stored === 'cupcake' || stored === 'dim' ? stored : 'cupcake';
  })();

  toggleTheme() {
    this.theme = this.theme === 'cupcake' ? 'dim' : 'cupcake';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }
}
