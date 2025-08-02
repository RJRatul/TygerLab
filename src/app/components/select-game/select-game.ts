import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-game.html',
  styleUrls: ['./select-game.scss']
})
export class SelectGame implements AfterViewInit {
  selectedDuration = 6;
  maxDuration = 14;
  sliderPoints = Array.from({ length: 9 }, (_, i) => i + 1);
  // sliderPoints = Array(this.maxDuration).fill(0);

  ngAfterViewInit() {
    const track = document.querySelector('.slider-track') as HTMLElement;
    const dots = track?.querySelectorAll('.slider-dot') || [];
    const spacing = 100 / (this.sliderPoints.length - 1);

    dots.forEach((dot, index) => {
      (dot as HTMLElement).style.left = `${spacing * index}%`;
    });
  }

  updateDuration(index: number) {
    this.selectedDuration = index + 5;
  }

  get endTime(): string {
    const startHour = 17;
    const startMinute = 30;
    const totalMinutes = (startHour * 60 + startMinute) + this.selectedDuration * 60;

    const hour = Math.floor(totalMinutes / 60) % 24;
    const minute = totalMinutes % 60;

    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const paddedMinute = minute.toString().padStart(2, '0');

    return `${displayHour}:${paddedMinute} ${ampm}`;
  }
}
