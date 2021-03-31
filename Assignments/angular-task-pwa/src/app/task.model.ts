export class Task{  //This class used to map JSON Data

    constructor(
        public id:number,
        public name:string,
        public task:string, 
        public deadline:Date
       ){
    }
}