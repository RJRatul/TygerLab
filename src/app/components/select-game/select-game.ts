import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
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
  @ViewChild('handle', { static: false }) handleRef!: ElementRef;
  selectedDuration = 6;
  sliderPoints = Array.from({ length: 9 }, (_, i) => i + 1);

  private dragging = false;
  private sliderRect!: DOMRect;

  ngAfterViewInit() {
    const track = document.querySelector('.slider-track') as HTMLElement;
    const dots = track?.querySelectorAll('.slider-dot') || [];
    const spacing = 90 / (this.sliderPoints.length - 1);

    dots.forEach((dot, index) => {
      (dot as HTMLElement).style.left = `${spacing * index}%`;
    });

    this.sliderRect = track.getBoundingClientRect();
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    this.dragging = true;
    this.sliderRect = (document.querySelector('.slider-track') as HTMLElement).getBoundingClientRect();
    event.preventDefault();
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  onDragEnd() {
    this.dragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
@HostListener('window:touchmove', ['$event'])
onDragMove(event: MouseEvent | TouchEvent) {
  if (!this.dragging || !this.sliderRect) return;

  let clientX: number;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
  } else {
    clientX = event.touches[0].clientX;
  }

  const offsetX = clientX - this.sliderRect.left;

  if (offsetX < 0 || offsetX > this.sliderRect.width) return;

  const percent = (offsetX / this.sliderRect.width) * 100;

  const totalSteps = this.sliderPoints.length - 1;
  const index = Math.round(percent / (100 / totalSteps));

  this.updateDuration(index);
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
  get stadiumTranslateX(): number {
    const minOffset = 0;
    const maxOffset = 30;
    const progress = (this.selectedDuration - 6) / (this.sliderPoints.length - 6);
    return minOffset + progress * (maxOffset - minOffset);
  }
  get stadiumScale(): number {
    const minScale = 0.9;
    const maxScale = 1.05;
    const progress = (this.selectedDuration - 6) / (this.sliderPoints.length - 6);
    return minScale + progress * (maxScale - minScale);
  }
}
