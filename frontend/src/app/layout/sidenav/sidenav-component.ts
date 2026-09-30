import {Component, inject} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatButton} from '@angular/material/button';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatButton,
    RouterOutlet
  ],
  selector: 'app-sidenav-component',
  styleUrl: './sidenav-component.scss',
  templateUrl: './sidenav-component.html',
})
export default class SidenavComponent {
  router: Router = inject(Router);
  actions = [
    {
      label: 'Biblioteca',
      fn: ()=> {
        this.router.navigateByUrl('library');
      },
      id: 1,
    },
    {
      label: 'Papelera',
      fn: () => {
        this.router.navigateByUrl('paper');
      },
      id: 2,
    }
  ];
}
