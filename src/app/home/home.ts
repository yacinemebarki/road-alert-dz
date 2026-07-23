import { Component } from '@angular/core';
import { HomeSection } from '../home-section/home-section';
import { Header } from '../header/header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSection, Header],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
