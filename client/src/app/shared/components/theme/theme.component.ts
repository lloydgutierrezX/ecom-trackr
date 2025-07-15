import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

type ITheme = 'garden' | 'dracula';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './theme.component.html'
})

export class ThemeComponent implements OnInit {
  readonly Moon = Moon;
  readonly Sun = Sun;

  theme: ITheme = ((): ITheme => {
    const stored = localStorage.getItem('theme');
    return stored === 'garden' || stored === 'dracula' ? stored : 'garden';
  })();

  ngOnInit() {
    this.setTheme(this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'garden' ? 'dracula' : 'garden';
    this.setTheme(this.theme);
  }

  setTheme(theme: ITheme) {
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }
}
