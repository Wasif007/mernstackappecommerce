class ApiFeatures {
    constructor(query,queryString){
        //Setting query and queryStrings
        this.query=query;
        this.queryString=queryString;
    }
    search(){
        //Setting keyword if it is available than making a object of name where regularEx is given with all size
        const keyword=this.queryString.keyword?{
            name:{
                $regex:this.queryString.keyword,
                $options:"i"
            }
        }:{};

       
        //finding the thing in all products with that keyword
        this.query=this.query.find({...keyword});
        //returning whole class
        return this;
    }

    filter(){
        //Making a copy of query String not referencing 
        const queryCopy={...this.queryString};
        //Keywords that we dont want while doing filter
        const keywordToRemove=["keyword","page","limit"];
        
        //For each loop to delete all query that are not required except category
        keywordToRemove.forEach(key=>delete queryCopy[key]);
        
        //Converting query in string to add $ as mongo search in that
        let stringCopy=JSON.stringify(queryCopy);
        //Using regex to replace all with $values
        stringCopy=stringCopy.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);


        //finding it with query.find function
        //Reconverting it into JSON data
        this.query=this.query.find(JSON.parse(stringCopy));
        //returning this class
        return this;
    }
} 
module.exports=ApiFeatures 