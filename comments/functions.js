$(document).ready(function(){

   function renderTemplate (templateId, variables) {
      return Handlebars.compile($(templateId).html())(variables)
   }

   $(".comments__list").sortable({
      revert: true
    });

   $(".comments").on("click", "input[name=hide-form]", function(){
      $("form[name=update], form[name=answer]").hide();
   });

   $(".comments").on("click", "input[name=send-comment]", function(e){
      $(".comments__empty").hide();

      var val = $("textarea[name=form-send__comment]").val ();

      $(renderTemplate("#comments__i", {value: val})).appendTo($(".comments__list"));
      $("textarea[name=form-send__comment]").val ("");
   });

   $(".comments").on("click", "input[name=send-answer]", function(e){
      var val = $("textarea[name=textarea-answer]").val ();
      var parent = $(e.target).parent().parent();

      $(renderTemplate("#comments__answer__i", {value: val})).appendTo($(parent));
      $("form[name=answer]").remove();

      var answersCount =  parent.find(".comments__answer").length;
      var answerPlace = $(parent).children(".answer-count");

      $(answerPlace).replaceWith(renderTemplate("#answer__counter", {count: answersCount}));
   });

   $(".comments").on("click", "input[name=send-update]", function(e){
      var val = $("textarea[name=textarea-update]").val ();
      var parent = $(e.target).parent().parent();
      var insertInto = $(parent).children(".comment-text");

      $(insertInto).replaceWith(renderTemplate("#comment__text", {value: val}));
      $("form[name=update]").remove();
   });

   $(".comments").on("click", ".comments__list", function(e){
      e.preventDefault();
      var parent = $(e.target).parent();

      if (e.target.className == "answer"){
         var formData = {
            form_name: "answer",
            textarea_name: "textarea-answer",
            input_name: "send-answer"};
         $(renderTemplate("#additional-form", formData)).appendTo($(parent));
      }
      else if (e.target.className == "delete"){
         $($(e.target).parent()).remove();
         console.log(context);
      }
      else if (e.target.className == "update"){
         var formData = {
            form_name: "update",
            textarea_name: "textarea-update",
            input_name: "send-update"};
         var text = $(parent).children(".comment-text").text();

         $(renderTemplate("#additional-form", formData)).appendTo($(parent));
         $("textarea[name=textarea-update]").val(text);
      }
   });

});