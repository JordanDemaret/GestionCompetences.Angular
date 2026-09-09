import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appAfficherMotDePasse]',
})
export class AfficherMotDePasseDirective implements OnInit {

   // Récupérer l'élément (enveloppe) sur lequel la directive est appliquée 
  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);
  // Manipuler le DOM d'Angular
  private readonly renderer = inject(Renderer2);

  private visible = false;
  private button!: HTMLButtonElement;
  private icon! : HTMLElement;

  ngOnInit(): void {
    const input = this.host.nativeElement;
    const parent = this.renderer.parentNode(input);

    const wrapper = this.renderer.createElement('span');
    this.renderer.addClass(wrapper, 'password-field');
    this.renderer.insertBefore(parent, wrapper, input);
    this.renderer.appendChild(wrapper, input);

    this.button = this.renderer.createElement("button");
    this.renderer.setAttribute(this.button, 'type', 'button');
    this.renderer.addClass(this.button, 'password-toggle-btn');
    this.renderer.appendChild(wrapper, this.button);
    
    this.icon = this.renderer.createElement("i");
    this.renderer.appendChild(this.button, this.icon);

    this.renderer.listen(this.button, "click", () => this.toggle());

    this.render();
  }

  private toggle(): void {
    this.visible = !this.visible;

    this.render();
  }

  private render() {
    const input = this.host.nativeElement;

    this.renderer.setAttribute(input, 'type', this.visible ? 'text' : 'password');
    this.renderer.setAttribute(this.icon, 'class', this.visible ? 'pi pi-eye-slash' : 'pi pi-eye');
  }
  //

}
