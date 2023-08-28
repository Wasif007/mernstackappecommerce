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

        console.log(keyword);
        //finding the thing in all products with that keyword
        this.query=this.query.find({...keyword});
        //returning whole class
        return this;
    }
} 
module.exports=ApiFeatures 