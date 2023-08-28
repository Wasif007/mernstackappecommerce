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
        console.log(queryCopy);
        //For each loop to delete all query that are not required except category
        keywordToRemove.forEach(key=>delete queryCopy[key]);
        console.log(queryCopy);
        //finding it with query.find function
        this.query=this.query.find(queryCopy);
        //returning this class
        return this;
    }
} 
module.exports=ApiFeatures 