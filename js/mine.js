/******global implementation */
var pNameInput  = document.getElementById("pName");
var pPriceInput = document.getElementById("pPrice");
var pCatInput   = document.getElementById("pCat");
var pDescInput  = document.getElementById("pDesc");
var allProducts =[];
//************************function of check input self invoke************************** */
(function()
{
    var pName   = pNameInput.value;
    var pPrice  = parseInt(pPriceInput.value);
    var pCat    = pCatInput.value;
    var pDesc   = pDescInput.value;


    if(pName == "")
        {
            var errorName = document.getElementById("errorName")


            pNameInput.addEventListener("focusout",function(){
                var pName   = pNameInput.value;

                if(pName == "")
                {
                    errorName.className="alert alert-danger d-block"
                    pNameInput.className="form-control mb-3 is-invalid"

                }
            })

            pNameInput.addEventListener("keyup",function(){
                var pName   = pNameInput.value;

                    if(pName != "")
                    {
                        errorName.className="d-none"
                        pNameInput.className="form-control mb-3 is-valid"
                    }
                    else
                    {
                        if(pName == "")
                        {
                            errorName.className="alert alert-danger d-block"
                            pNameInput.className="form-control mb-3 is-invalid"
        
                        }
                    }
                    
            })
    }
        


    if(isNaN(pPrice) == true ){
                var errorPrice = document.getElementById("errorPrice")
                pPriceInput.addEventListener("focusout",function(){
                var pPrice  = parseInt(pPriceInput.value);
                if(pPrice == "" || isNaN(pPrice) == true )
                {
                    errorPrice.className="d-block alert alert-danger"
                    pPriceInput.className="form-control mb-3 is-invalid"
                }
            });
                pPriceInput.addEventListener("keyup" , function(){
                    var pPrice  = pPriceInput.value;
                    if(isNaN(pPrice)!= true && pPrice != "")
                    {errorPrice.className="d-none"
                    pPriceInput.className="form-control mb-3 is-valid"}
                    else
                    {
                    if(pPrice == "" || isNaN(pPrice) == true )
                    {
                    errorPrice.className="d-block alert alert-danger"
                    pPriceInput.className="form-control mb-3 is-invalid"
                    }
                    }

                    })
            
    }


    if(pCat == "")
        {
            var errorCat = document.getElementById("errorCat")


            pCatInput.addEventListener("focusout",function(){
                var pCat    = pCatInput.value;

                if(pCat == "")
                {
                    errorCat.className="alert alert-danger d-block"
                    pCatInput.className="form-control mb-3 is-invalid"

                }
            })

            pCatInput.addEventListener("keyup",function(){
                var pCat    = pCatInput.value;

                    if(pCat != "")
                    {
                        errorCat.className="d-none"
                        pCatInput.className="form-control mb-3 is-valid"
                    }
                    else
                    {
                        if(pCat == "")
                        {
                            errorCat.className="alert alert-danger d-block"
                            pCatInput.className="form-control mb-3 is-invalid"
        
                        }
                    }
                    
            })
    }

    
    if(pDesc == "")
        {
            var errorDesc = document.getElementById("errorDesc")


            pDescInput.addEventListener("focusout",function(){
                var pDesc   = pDescInput.value;

                if(pDesc == "")
                {
                    errorDesc.className="alert alert-danger d-block"
                    pDescInput.className="form-control mb-3 is-invalid"

                }
            })

            pDescInput.addEventListener("keyup",function(){
                var pDesc   = pDescInput.value;

                    if(pDesc != "")
                    {
                        errorDesc.className="d-none"
                        pDescInput.className="form-control  is-valid"
                    }
                    else
                    {
                        if(pDesc == "")
                        {
                            errorDesc.className="alert alert-danger d-block"
                            pDescInput.className="form-control mb-3 is-invalid"
        
                        }
                    }
                    
            })
    }

})()
/*************calling function for display all products after refresh********************/
dispalyProdcut()

//**************************add product function****************************** */
function addProduct()
{


    var pName   = pNameInput.value;
    var pPrice  = parseInt(pPriceInput.value);
    var pCat    = pCatInput.value;
    var pDesc   = pDescInput.value;

    if(pName != "" && isNaN(pPrice) != true && pCat != "" && pDesc != "")
    {

        /************ one product*************** */
        var oneProduct ={
                        Name: pName , 
                        Price: pPrice ,
                        Cat: pCat ,
                        Desc: pDesc
                        };
        /*************add new prodcut**************** */                
        allProducts.push(oneProduct)

        localStorage.setItem("AllProdcutsStorage" , JSON.stringify(allProducts) );
        /*************empty Value**************** */   
        clearValue();
        /*************display product**************** */  
        
        dispalyProdcut();

    }
    else
    {
        validationInput()

    }
    
    


}
//***************************clear input after add or update function**************************** */
function clearValue()
{
    pNameInput.value    ="";
    pPriceInput.value   ="";
    pCatInput.value     ="";
    pDescInput.value    ="";
    normalInput()
}
//**********************  display all products function************************ */
function dispalyProdcut()
{

    if(localStorage.getItem("AllProdcutsStorage") != null)
    {
        allProducts=JSON.parse(localStorage.getItem("AllProdcutsStorage"))
        var collcetor =``;
        for(var i =0 ; i < allProducts.length ; i++)
        {
            collcetor = collcetor + `
            <tr>
            <td>`+allProducts[i].Name+`</td>
            <td>`+allProducts[i].Price+`</td>
            <td>`+allProducts[i].Cat+`</td>
            <td>`+allProducts[i].Desc+`</td>
            <td> <button class="btn btn-outline-warning" onclick="getProduct(`+i+`)">Update</button></td>
            <td> <button class="btn btn-outline-danger" onclick="deleteProduct(`+i+`)"> Delete </button></td>
            </tr>
            `
        }
        document.getElementById("tbody").innerHTML=collcetor;
}

return i;
}
//************************* delete product function****************************** */
function deleteProduct(i)
{

    allProducts.splice(i ,1)
    localStorage.setItem("AllProdcutsStorage" , JSON.stringify(allProducts) );
    dispalyProdcut();
    
}
//**********************Getting product and display in input ********************************* */
function getProduct(i)
{

        document.getElementById("addBtn").className="btn btn-warning mt-3 mb-5"
        document.getElementById("addBtn").innerHTML="Update Product"
        document.getElementById("addBtn").setAttribute("onclick",'updateProduct('+i+')' )
        pNameInput.value=allProducts[i].Name;
        pPriceInput.value=allProducts[i].Price;
        pCatInput.value=allProducts[i].Cat;
        pDescInput.value=allProducts[i].Desc;

        validationInput()


}
//*************************edit and set new update ****************************** */
function updateProduct(i)
{
    var pName   = pNameInput.value;
    var pPrice  = parseInt(pPriceInput.value);
    var pCat    = pCatInput.value;
    var pDesc   = pDescInput.value;  

        if(pName != "" && isNaN(pPrice) != true && pCat != "" && pDesc != "")
        {  
            /************ new product*************** */
            var newProduct ={
                            Name: pName , 
                            Price: pPrice ,
                            Cat: pCat ,
                            Desc: pDesc
                            };

                            allProducts[i] = newProduct;
                            localStorage.setItem("AllProdcutsStorage" , JSON.stringify(allProducts) );
                            document.getElementById("addBtn").className="btn btn-primary mt-3 mb-5"
                            document.getElementById("addBtn").innerHTML="Add Product"
                            document.getElementById("addBtn").setAttribute("onclick",'addProduct()' )
                            dispalyProdcut();
                            clearValue();
                            
        }
        else
        { 
            validationInput()
        
        }
}
//*************************search method ****************************** */
function searchProduct(userWord)
{
    
    var collcetor =``;

    for(var i =0 ; i < allProducts.length ; i++)
    {
        if(allProducts[i].Name.toLowerCase().includes(userWord.toLowerCase()))
        {
            collcetor = collcetor + `
            <tr>
            <td>`+allProducts[i].Name+`</td>
            <td>`+allProducts[i].Price+`</td>
            <td>`+allProducts[i].Cat+`</td>
            <td>`+allProducts[i].Desc+`</td>
            <td> <button class="btn btn-outline-warning" onclick="getProduct(`+i+`)">Update</button></td>
            <td> <button class="btn btn-outline-danger" onclick="deleteProduct(`+i+`)"> Delete </button></td>
            </tr>
            `
        }
    
    }
    document.getElementById("tbody").innerHTML= collcetor;

}
//************************** validation input after on click add product or update***************************** */
function validationInput()
{
    var pName   = pNameInput.value;
    var pPrice  = parseInt(pPriceInput.value);
    var pCat    = pCatInput.value;
    var pDesc   = pDescInput.value;


    var errorName = document.getElementById("errorName")
    if(pName != "")
    {
        errorName.className="d-none"
        pNameInput.className="form-control mb-3 is-valid"
    }
    else
    {
        if(pName == "")
        {
            errorName.className="alert alert-danger d-block"
            pNameInput.className="form-control mb-3 is-invalid"

        }

    }

    var errorPrice = document.getElementById("errorPrice")

        if(isNaN(pPrice)!= true && pPrice != "")
        {
        errorPrice.className="d-none"
        pPriceInput.className="form-control mb-3 is-valid"}
        else
        {
            if(pPrice == "" || isNaN(pPrice) == true )
        {
            errorPrice.className="d-block alert alert-danger"
            pPriceInput.className="form-control mb-3 is-invalid"
        }
        }


    var errorCat = document.getElementById("errorCat")
    if(pCat != "")
    {
        errorCat.className="d-none"
        pCatInput.className="form-control mb-3 is-valid"
    }
    else
    {
        if(pCat == "")
        {
            errorCat.className="alert alert-danger d-block"
            pCatInput.className="form-control mb-3 is-invalid"

        }
    }



    var errorDesc = document.getElementById("errorDesc")
    if(pDesc != "")
    {
        errorDesc.className="d-none"
        pDescInput.className="form-control  is-valid"
    }
    else
    {
        if(pDesc == "")
        {
            errorDesc.className="alert alert-danger d-block"
            pDescInput.className="form-control mb-3 is-invalid"

        }
    }
}
//************************* set all input normal after add or update product****************************** */
function normalInput()
{
    var errorName = document.getElementById("errorName")
    var errorPrice = document.getElementById("errorPrice")
    var errorCat = document.getElementById("errorCat")
    var errorDesc = document.getElementById("errorDesc")
    if(pNameInput.value == "" && pPriceInput.value == "" && pCatInput.value=="" && pDescInput.value == "")
    {
        errorName.className="d-none"
        pNameInput.className="form-control mb-3"
        errorPrice.className="d-none"
        pPriceInput.className="form-control mb-3"
        errorCat.className="d-none"
        pCatInput.className="form-control mb-3"
        errorDesc.className="d-none"
        pDescInput.className="form-control "
        document.getElementById("addBtn").className="btn btn-primary mt-3 mb-5"
        document.getElementById("addBtn").innerHTML="Add Product"
        document.getElementById("addBtn").setAttribute("onclick",'addProduct()' )
    }
}