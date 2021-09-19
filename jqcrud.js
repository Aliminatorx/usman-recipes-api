$(function(){
    loadRecipies();
    $("#recipies").on("click",".btn-danger", handleDelete);
    $("#recipies").on("click",".btn-warning",handleUpdate);
    $("#addbtn").click(addRecipe);
    $("#updateSave").click(function(){
       var id = $("#updateId").val();
       var title = $("#updateTitle").val();
       var body = $("#updateBody").val();

     $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/" +id,
        data:{title,body},
        method:"PUT",
        success:function(response){
            console.log(response);
            loadRecipies();
            $("#updateModal").modal("hide");
        }

       });
    });
});
function handleUpdate(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+ id, function(response){
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");
    });
}
function addRecipe(){
    var title = $("#title").val();
    var body = $("#body").val();
    
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"POST",
        data:{title,body},
        success:function(response){
            console.log(response);
            $("#title").val("");
            $("#body").val("");
            loadRecipies();
        }
    });
}

function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+ id,
        method:"DELETE",
        success: function() {
        loadRecipies();
        }
    });
}
function loadRecipies(){
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"GET",
        error: function(response){
            var recipes = $("#recipies");
            recipes.html("An error has occured");
        },
        success: function(response){
            console.log(response);
            var recipes = $("#recipies");
            recipes.empty();
            for(var i = 0; i< response.length; i++){
                var rec = response[i];
                recipes.append(`<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button id="btndel" class="btn btn-danger btn-sm float-right">Delete</button><button id="btnedt" class="btn btn-warning btn-sm float-right">Edit</button>${rec.body}</p></div>`)
                // recipes.append("<div><h3>"+rec.title+"</h3></div>");
            } 
        }
    });
}