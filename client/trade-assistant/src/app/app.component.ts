import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ❗️ треба да биде "styleUrls" (во множина)
})
export class AppComponent {
  title = 'trade-assistant';
}
