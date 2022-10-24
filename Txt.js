class Txt{
  
  constructor(txt, x, y, hidden){
    
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.hidden = hidden;
    
  }
  
  show(){
    if (this.hidden) return;
    text(this.txt, this.x, this.y);
  }
  
}