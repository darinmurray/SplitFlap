
// Fired when document is ready, wrapps everything  
window.onload = function() { 
 
  window.total_characters = 5
    
   
  // ===============  S P E E D  ================ // 
  // ===============  (sliders)  ================ // 
  // ===============  =========  ================ //  
  // Length of time to change all characters in the string - set default value
  let speed_slider = document.getElementById("message_speed_slider")
  window.user_message_speed = speed_slider.value;
  // Update the current slider value (each time you drag the slider handle)
  speed_slider.oninput = function(e) {
    // update the HTML   
    var x = this.min;
    var y = this.max;
    posNum = getPercentOfRange(x, this.value, y)
    negNum = (1.0 - posNum).toFixed(1)
  
    // This is nice/reuseable on multiple elements without change 
    // if the dom is fixed, but if the HTML changes, you are screwed
    // this.parentElement.previousElementSibling.style.opacity=posNum; //"slower"
    // this.parentElement.nextElementSibling.style.opacity=negNum; /// "faster"
    
    document.querySelector(".message_speed_container .slower").style.opacity=posNum;
    document.querySelector(".message_speed_container .faster").style.opacity=negNum;    
    // update global variable for display function
    window.user_message_speed = this.value;  
  }  
  
  
    
  // ====== get % of # between min & max of a given range ========= //
  // E.G. from 35 to 356, what percentage (of the range) is 121? 
   function getPercentOfRange(min, current, max) {  
     // change *1 to *100 for whole numbers
     // currently returning opacity 0.1 - 1.0
     return percentage = (((current - min) * 1) / (max - min)).toFixed(1);  
   } 
    
  // =======   Generate a Random Int between min & max   ========== //
  // getRandomInt(1, 10)*100   for increments less than one second
   function getRandomInt(min, max) { 
     return Math.round((min - 0.5) + Math.random() * (max - min + 1));
   }
   
    
    
    
    
    
    
    
    
  // character flip duration  
  //var flip_speed_slider = document.getElementById("flip_speed_slider");
  //var flip_speed_output = document.getElementById("flip_speed").childNodes[1];
  //let user_flip_speed = document.getElementById("flip_speed_slider").value;
  // Display the default slider value
  // document.getElementById("flip_speed").childNodes[1].innerHTML = user_flip_speed 
  
  // Update the current slider value (each time you drag the slider handle)
  // HOW IS THIS WORKING ????? flip_speed_slider is NOT declared anywhere?
  flip_speed_slider.oninput = function() { 
    // update the HTML   
    var x = this.min;
    var y = this.max;
    posNum = getPercentOfRange(x, this.value, y)
    negNum = (1.0 - posNum).toFixed(1)
  
    // This is nice/reuseable on multiple elements without change 
    // if the dom is fixed, but if the HTML changes, you are screwed
    // this.parentElement.previousElementSibling.style.opacity=posNum; //"slower"
    // this.parentElement.nextElementSibling.style.opacity=negNum; /// "faster" 
    document.querySelector(".flip_speed_container .slower").style.opacity=posNum;
    document.querySelector(".flip_speed_container .faster").style.opacity=negNum;    
    
    // ***** update the variable in  CSS:root ********
    //https://stackoverflow.com/questions/37801882/how-to-change-css-root-color-variables-in-javascript
    document.documentElement.style.setProperty('--timing', this.value/100+'s');
  }  
   
  
    
    
    
    
  // ===============  F L I P P I N G  ================ // 
  // ===============     (function)    ================ // 
  // ===============  ===============  ================ //  
    
  $(".button").click(function() { 
    flipCharacters()
  });  
  
  function getString(){
  let strings = ["DARIN ","RETRO, DARIN","PIPER","LUCKY","DARIN"]
  
  // let strings = ["DADA IS THE BEST DADA!!","ERIN MORRIS, DANCING QUEEN IS IN CALIFORNIA VISITING HER DADA ","PIPER MAE LOVES PINK AND UNICORNS AND AND FLUFFY THINGS OF ALL KINDS","LUCKY DOG IS REALLY A LUCKY DOG AND GETS TO SLEEP IN THE BED","KITTEN THE CAT LIKES TO GET UP EARLY AND WAKE US UP FOR BREAKFAST"]
  
  return stringy = strings[getRandomInt(0, 4)]
  }
  
  function flipCharacters(){ 
  stringy = getString()   
  //console.log(user_flip_speed)
   $('div.element').each(function(index) {
     var thisElement = this;
     var howMany = $('div.element').length; 
     var ranNum = Math.floor(Math.random() * user_message_speed); 
     // setup the interval and give it a name to clear later 
     var flipThis = setInterval(function() {
  
       // ********************************************* 
       // console.log("speed is: "+user_flip_speed+" at index: "+index) 
          var nextChar = stringy[index]
          if (nextChar == undefined || nextChar == ''){ nextChar = " "}
          // add the transition class to current item in the each/array
          $(thisElement).find(".flap").addClass('flipped')     
          $(thisElement).find(" .top_back_shadow").addClass('flipped')// transition 
          $(thisElement).find(" .shadow").addClass('flipped')         // transition
          $(thisElement).find(" .front").addClass('flipped')          // ANIMATION    
          $(thisElement).find(" .back_shine").addClass('flipped')     // ANIMATION on back as flipped down
          $(thisElement).find(" .back h1" ).text( nextChar )          // update character component
          $(thisElement).find(" .top" ).text( nextChar )              // update character component  
              // change character component and remove .flipped on the current item after transitionEnd
              $(thisElement).find(".flap").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                function(e) {
                  //$(this).find(".flap").removeClass("flipped");
                  $(thisElement).find(".flap").removeClass("flipped");
                  // find 'this's children with class 
                  $(thisElement).find(" .front").removeClass('flipped');
                  $(thisElement).find(" .back_shine").removeClass('flipped');
                  $(thisElement).find(" .front h1" ).text( nextChar );   
                  // these two shadows happen OUTSIDE of .flap, up a level inside .element  
                  // so, use jquery .parent()
                  $(thisElement).parent().find(" .shadow").removeClass('flipped'); 
                  $(thisElement).parent().find(" .top_back_shadow").removeClass('flipped')    
                  $(thisElement).parent().find(" .bottom" ).text( nextChar ); 
              }); 
       // *********************************************
       // clear interval if index has surpased #of elements
       index<=howMany ? window.clearInterval(flipThis) : ""
      }, ranNum); 
  });
   
  }; // end of flipEach() 
    
   
    
    
    
    
  // ===============  I N I T I A L I Z E  ================ // 
  // ===============  (render x elements)  ================ // 
  // ===============  = { in the html } =  ================ //  
  
  // Get from random array until form is filled out
  user_input = getString() 
  
  // replace this function in the master file
  function renderCharacters( user_input ){
      // 1. Renders each slot & fills with character from array  
      for (let step = 0; step < total_characters; step++) {
        initial_character = user_input[step] //string_arr[step] 
        // This is JUST a placeholder for initial rendering of panel
        // <== step through array of the default string initial_string
        if (initial_character == undefined || initial_character == ''){ initial_character = " "}
        // 2.  # of possible .class_X options for random look
        class_option =  Math.floor(Math.random() * 4); 
        // 3.  append single character to HTML      
              // clone the original HTML markup for the element to replicate
              var clone = $("#pos_1_").clone();
              var newId = clone.attr("id")+(step+1);
              clone.attr("id", newId).removeAttr("style");
              // INSIDE the clone, find and change this 
              clone.find(".front h1").text( initial_character );
              clone.find(".top, .bottom, .front h1").text( initial_character ); 
              // add position class and random background/shadows classes
              // Shadows need to be from a reversed(_R) set of shadows for this positioning
              clone.find(".back").addClass("background_"+class_option+" shadows_R"+class_option); 
              clone.find(".bottom").addClass("background_"+class_option+" shadows_R"+class_option); 
              clone.find(".top").addClass("shadows_R"+class_option); // testing
              clone.find(".front").addClass("shadows_R"+class_option); // testing 
              clone.addClass("pos_1_"+(step+1)); 
              // adding shadows on .element makes it look more like a frame, than a hole
              clone.find(".element").addClass("background_"+class_option); // +" shadows_"+class_option 
              clone.addClass("shadows_"+class_option); // +" shadows_"+class_option     
              //append clones on the end till done
              $("#display_board_X").append(clone)   
      }  // end FOR 
  }; // ====== end of initial character rendering ====== //
   
  // put the characters on screen
  renderCharacters( user_input )
    
  }; // window onload 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // ===============  U T I L I T Y  ================ // 
  // ===============   (functionS)   ================ // 
  // ===============   ==========    ================ //  
  
  // ==========   Generate a Random Alpha Character   ============= //
  function startCycle() {
    // do something here  
    clockTO = setTimeout(startCycle, 1000) 
    // call to initialize the looping
    startCycle()
   }; // end startTimefunction
  
  // ==========   Generate a Random Alpha Character   ============= //
  randoAlpha = String.fromCharCode(65+Math.floor(Math.random() * 26)); 
  
  
  