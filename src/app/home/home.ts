import { Component } from '@angular/core';
import { HomeSection } from '../home-section/home-section';
import { Header } from '../header/header';
import { ServiveSection } from '../servive-section/servive-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSection, Header, ServiveSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
