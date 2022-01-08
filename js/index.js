
$(".button.one").click(function() { 
  // change_character()
 //        step++
 //        //setTimeout(function ( ) {  
 //        change_character_w_pos(step) 
 //        //}, 200);   
 //        if (step>=total_characters) {step = 0 }
 //        console.log(step)
  activateFlip()
});
 


window.total_characters = 7
step = 0

function activateFlip( stringy) { 
  // change_character()
  // console.log("activateFlip starting step: "+step)
  
          //setTimeout(function ( ) { 
    if (!stringy) {stringy = "-------------"}
    change_character_w_pos(step, stringy) 
       //}, 200);   
    if (step >= total_characters) {step = 0 }
  step++
  // console.log("activateFlip step(at end): "+step) 
  // console.log("stringy in activateFlip: "+stringy)
};


 

  
function change_character_w_pos( step, stringy ) { 
  position = "#pos_1_"+(step)// already incremented in the function variable
  //console.clear()
  //console.log("stringy in change_character: "+stringy)
  // get/insert char here, rando for dev
  rando = stringy[step-1] //String.fromCharCode(65+Math.floor(Math.random() * 26));  
  // this is the main timing variable. 
  // All others are calculated from this one
  // if timing never changes, coudl all be done in css
  timing = 2    // 2 is fast, 20 is slow
   
  $(position+" .flap").css( { // flips the top panel
                    "transform" : "rotateX(-180deg)", 
          "transition-property" : "transform",
   "transition-timing-function" : "linear",
        "transition-duration" : (timing/14).toFixed(2)+"s",  
           "transition-delay" : "0s" 
  });
  
    $(position+" .top_back_shadow").css( { // adds shadow to the bottom half when top flipped over it
                    "opacity" : "0", 
          "transition-property" : "opacity",
   "transition-timing-function" : "ease-in",
        "transition-duration" : (timing/20).toFixed(2)+"s",    // lower # is slower   
           "transition-delay" : (timing/80).toFixed(2)+"s"     // lower # is slower 
  });

  
  $(position+" .shadow").css( { // adds shadow to the bottom half when top flipped over it
                    "opacity" : "1", 
          "transition-property" : "opacity",
   "transition-timing-function" : "ease-in-out",
        "transition-duration" : (timing/57).toFixed(2)+"s",    // 35   
           "transition-delay" : (timing/44).toFixed(2)+"s"     // 45.  
  });
  
// replaces the .shiny class on 'front'; animates the shine as it flips
$(position+" .front").css( { // Shines top panel
             "background" : "linear-gradient(178deg,#0000 5%,rgba(255,255,255,0.3) 50%,#0000 96%) rgba(50,50,50,1)",
        "background-size" : "100% 400%",
              "animation" : "shineFront "+(timing/40).toFixed(2)+"s 1" // default was 0.5       
});
 
// replaces the .shiny class on 'back/bottom' animates the shine as it flips
$(position+" .back").css( { // Shines top panel 
              "background" : "linear-gradient(178deg,#0000 5%,rgba(255,255,255,0.3) 50%,#0000 96%) rgba(50,50,50,1)",
         "background-size" : "100% 400%", 
               "animation" : "shineBack "+(timing/4).toFixed(2)+"s 1"  // /4 default was 0.5  
 });

// 1. => Probably needs to be on transitionENd for slow motion transitions   
$( position+" .back h1" ).text( rando );  
$( position+" .top" ).text( rando );

// NEW on TRANSITION END functions to replace timeout below... 
$(position+' .shadow').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
  function(e) {
     $(position+" .front h1" ).text( rando ); 
     $(position+" .bottom" ).text( rando ); // this was in a setTimeout with delay: container_h1_delay*2
  })
 
//  .front and .back are webkitAnimationEnd oanimationend msAnimationEnd animationend 
//  .top_back_shadow, .shadow, .flap are webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend  

// <=========. THIS WORKS, MOSTLY. TRYING WITH THE * ALL SELECTOR BELWO
// $(position+' .back').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
//     function(e) { // this ALMOST works... but nto if clicks are fast
//     $(position+" .back, "+position+" .front, "+position+" .flap, "+position+" .bottom, "+position+" .shadow, "+position+" .top_back_shadow").removeAttr("style");
//   // console.log("executed after .back Animation end")
// });

  
// <=========. THIS WORKS, same as above
//   $(position+' .back').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
//     function(e) { // this ALMOST works... but nto if clicks are fast
//     $(position+" *").removeAttr("style");
//   // console.log("executed after .back Animation end")
// });

// <=========. trying the above with timeout instead of AnimationEnd
// <=========. this actually works best!?!?!?!
setTimeout(function ( ) {  
  $(position+" *").removeAttr("style");
}, 200); // 100
  
  
  
  
};  // END of change_character function













$( ".button.two" ).click(function() { 
 strings = ["TESTING","DARIN MURRAY","ERIN MORRIS","PIPER MAE","LUCKY DOG","KITTEN THE CAT"]
  flipText(strings[getRandomInt(0, 5)]);
});  

$( ".button.three" ).click(function() { 
 flipText("XXXXXXXXXX");
  console.log("current_string now set to XXXXXXXX" )  
}); 

 $( ".button.four" ).click(function() { 
 flipText("WorkingNow");
});  





function getRandomInt(min, max) {
  // min/max for the length of time the character is flipping before stopping 
  return Math.round((min - 0.5) + Math.random() * (max - min + 1));
}
 
function flipText( string_sent ) {
// for (let stepX = 0; stepX <= total_characters; stepX++) {  
  console.clear()
    // min flip interval
    var interval = 50;  // 50
    // the #by which "interval" gets devided by, 
    // thereby speedin it up.
    var incrementalFactor = 0.1 // 0.2    
    // console.log( incrementalFactor ) 
    timer = function() {
                        interval+=Math.floor(interval*incrementalFactor);   
                        //do your thing here
                        // $(".button").click(); // initiate flip character function, NOT click button 
                        
                              // if (interval >= incrementalFactor) {  
                              //   // alert(" interval is "+interval) 
                              //   new_text = "ABCDEF" 
                              // } else {
                              //   new_text = "123456"
                              // } 
                    console.log("STEP/Char BEFORE activate is: "+step)
                              //current_string = "DarinRocks" 
                              activateFlip( string_sent ) // (spin, stringy) 
                    // console.log("===========interval is: "+interval)
                              if (interval <= 400) { // 400 //incrementalFactor, lower number ends faster
                                setTimeout(timer, interval);
                                console.log("After If: "+interval)
                                // console.log("interval after IF is: "+interval)
                              }
                        };
    timer(); // call the timer function to flip the characters
// };  // End FOR loop


}; //end FUNCTION








// make this an array so I can call specific strings
//total_characters = 5


// replace this function in the master file
function render_characters( user_input ){
    // ***** LOG console.log("=== begin RENDER_CHARACTERS function");
    // 1. Renders each slot & fills with character from array 
    for (let step = 0; step < total_characters; step++) {
      initial_character = user_input[step] //string_arr[step] 
        // This is JUST a placeholder for initial rendering of panel
        // <== step through array of the default string initial_string
        if (initial_character == undefined || initial_character == ''){ initial_character = " "}
      // 2.  # of possible .class_X options for random look
      class_option =  Math.floor(Math.random() * 4); 
      // 3.  append single character to HTML      
      // now using the *CLONE* method
            // copy the original HTML markup for the element to replicate
            var clone = $("#pos_1_").clone();
            var newId = clone.attr("id")+(step+1);
            
            clone.attr("id", newId).removeAttr("style");
            // INSIDE the clone, find and change this 
            clone.find(".front h1").text( initial_character );
            clone.find(".top, .bottom, .front h1").text( initial_character ); 
            // add position class and random background/shadows classes
            clone.addClass(" pos_1_"+(step+1)+ " background_"+class_option + " shadows_"+class_option);     
            // BRILLIANT!!!!
            //append clones on the end till done
            $("#display_board_X").append(clone)   
    
  
    }  // end FOR 
   // ***** LOG console.log("=== end RENDER_CHARACTERS function"); 
}; // ====== end of Render_Characters ====== //
 

// put the characters on screen

// Fired when document is ready  
window.onload = function() {
    render_characters( "" )
}
   
























// = = = = = = = = === SCRAP AND FUN BELOW THIS LINE ==== = = = = = = = = = `
// = = = = = = = = === SCRAP AND FUN BELOW THIS LINE ==== = = = = = = = = = `
// = = = = = = = = === SCRAP AND FUN BELOW THIS LINE ==== = = = = = = = = = `
// = = = = = = = = === SCRAP AND FUN BELOW THIS LINE ==== = = = = = = = = = `
// = = = = = = = = === SCRAP AND FUN BELOW THIS LINE ==== = = = = = = = = = `
// = = = = = = = = === SCRAP AND FUN BELOW THIS LINE ==== = = = = = = = = = `


//   // const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];
//   // 
//   // gods.forEach(function (xName, index){
//   //   console.log(index + '. ' + xName);
//   // });
//   // create an element with an object literal, defining properties
//   var $e = $("<div>", {id: "fucktard", name: 'test', class: "aClass", text: "here it is"});
//   $e.click(function(){ /* ... */ alert("clicked") });
//   // add the element to the body
//   $(".button").after($e); 
//   
//   setInterval(myFunction, 1000);
//   
//   function myFunction() {
//     let d = new Date();
//     document.getElementById("fucktard").innerHTML=
//     d.getHours() + ":" +
//     d.getMinutes() + ":" +
//     d.getSeconds();
//   }
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   function change_character() { 
//     console.clear()
//     // get/insert char here, rando for dev
//     rando = String.fromCharCode(65+Math.floor(Math.random() * 26));  
//     // this is the main timing variable. 
//     // All others are calculated from this one
//     // if timing never changes, coudl all be done in css
//     timing = 2    // 2 is fast, 20 is slow
//      
//     $(" .flap").css( { // flips the top panel
//                       "transform" : "rotateX(-180deg)", 
//             "transition-property" : "transform",
//      "transition-timing-function" : "linear",
//           "transition-duration" : (timing/14).toFixed(2)+"s",  
//              "transition-delay" : "0s" 
//     });
//     
//       $(" .top_back_shadow").css( { // adds shadow to the bottom half when top flipped over it
//                       "opacity" : "0", 
//             "transition-property" : "opacity",
//      "transition-timing-function" : "ease-in",
//           "transition-duration" : (timing/20).toFixed(2)+"s",    // lower # is slower   
//              "transition-delay" : (timing/80).toFixed(2)+"s"     // lower # is slower 
//     });
//   
//     
//     $(" .shadow").css( { // adds shadow to the bottom half when top flipped over it
//                       "opacity" : "1", 
//             "transition-property" : "opacity",
//      "transition-timing-function" : "ease-in-out",
//           "transition-duration" : (timing/57).toFixed(2)+"s",    // 35   
//              "transition-delay" : (timing/44).toFixed(2)+"s"     // 45.  
//     });
//     
//   // replaces the .shiny class on 'front'; animates the shine as it flips
//   $(" .front").css( { // Shines top panel
//                "background" : "linear-gradient(178deg,#0000 5%,rgba(255,255,255,0.3) 50%,#0000 96%) rgba(50,50,50,1)",
//           "background-size" : "100% 400%",
//                 "animation" : "shineFront "+(timing/40).toFixed(2)+"s 1" // default was 0.5       
//   });
//    
//   // replaces the .shiny class on 'back/bottom' animates the shine as it flips
//   $(" .back").css( { // Shines top panel 
//                 "background" : "linear-gradient(178deg,#0000 5%,rgba(255,255,255,0.3) 50%,#0000 96%) rgba(50,50,50,1)",
//            "background-size" : "100% 400%",
//                  "animation" : "shineBack "+(timing/4).toFixed(2)+"s 1"  // default was 0.5  
//    });
//   
//   // 1. => Probably needs to be on transitionENd for slow motion transitions  
//   $( ".back h1" ).text( rando );  
//   $( ".top" ).text( rando );
//   
//   // NEW on TRANSITION END functions to replace timeout below... 
//   $('.shadow').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
//     function(e) {
//        $(".front h1" ).text( rando ); 
//        $(".bottom" ).text( rando ); // this was in a setTimeout with delay: container_h1_delay*2
//     })
//     
//   //  .back resets all styles after top shadow animation, NOT the right animation to follow, but it works 
//   $('.top_back_shadow').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
//       function(e) {
//       $(" .back, .front, .flap, .bottom, .shadow, .top_back_shadow").removeAttr("style");
//   });
//     
//   
//   };  // END of change_character function
//   
//   
//   
//   
//   
//   
//   
//   function change_character_w_posXXXXX( step ) { 
//     position = "#pos_1_"+(step)// already incremented in the function variable
//    // make it say WHICH element it's chaning, currently it's not based on posision!!
//     // get/insert char here, rando for dev
//     rando = String.fromCharCode(65+Math.floor(Math.random() * 26));  
//     // console.log(position + " "+ rando);
//     // this is the main timing variable. All others are calculated from this one
//     timing = 8  // 2 is fast, 20 is slow
//     reset_delay = (timing*70).toFixed(2) //*100 
//     // this is when the background changes to rando, from original
//     container_h1_delay = (timing*24).toFixed(2) //*50  
//     // resetting the top h1
//     reset_TOP__h1_delay = (timing*100).toFixed(2) //*50  
//     // Why is this not working?
//     front_shine_duration = (timing/40).toFixed(2)
//     
//     $(position+" .flap").css( { // flips the top panel
//                       "transform" : "rotateX(-180deg)", 
//             "transition-property" : "transform",
//      "transition-timing-function" : "linear",
//           "transition-duration" : (timing/14).toFixed(2)+"s",  
//              "transition-delay" : "0s" 
//     });
//     
//       $(position+" .top_back_shadow").css( { // adds shadow to the bottom half when top flipped over it
//                       "opacity" : "0", 
//             "transition-property" : "opacity",
//      "transition-timing-function" : "ease-in",
//           "transition-duration" : (timing/20).toFixed(2)+"s",    // lower # is slower   
//              "transition-delay" : (timing/80).toFixed(2)+"s"     // lower # is slower 
//     });
//   
//     
//     $(position+" .shadow").css( { // adds shadow to the bottom half when top flipped over it
//                       "opacity" : "1", 
//             "transition-property" : "opacity",
//      "transition-timing-function" : "ease-in",
//           "transition-duration" : (timing/57).toFixed(2)+"s",    // 35   
//              "transition-delay" : (timing/44).toFixed(2)+"s"     // 45.  
//     });
//    
//   // replaces the .shiny class on 'front'; animates the shine as it flips
//   $(position+" .front").css( { // Shines top panel
//                "background" : "linear-gradient(178deg,#0000 5%,rgba(255,255,255,0.3) 50%,#0000 96%) rgba(50,50,50,1)",
//           "background-size" : "100% 400%",
//                 "animation" : "shineFront "+front_shine_duration+"s 1" // default was 0.5       
//   });
//    
//   // replaces the .shiny class on 'back/bottom' animates the shine as it flips
//    setTimeout(function ( ) {  
//      $(position+" .back").css( { // Shines top panel
//                 "background" : "linear-gradient(178deg,#0000 5%,rgba(255,255,255,0.3) 50%,#0000 96%) rgba(50,50,50,1)",
//            "background-size" : "100% 400%",
//                  "animation" : "shineBack 0.6s 1" // default was 0.5      
//    });
//   }, (timing*40).toFixed(2)  );  // fraction of var timing ? 
//   
//      
//     
//   // 1. => update the char in the back  
//   $( position+" .back h1" ).text( rando );  
//   // 2. => change the text to appropriate text  
//   setTimeout(function () {  
//       $( position+" .top" ).text( rando );
//   }, container_h1_delay );  
//   // 3. => change the text to appropriate text
//   setTimeout(function () {  
//        $( position+" .bottom" ).text( rando );
//   }, container_h1_delay*2 ); 
//          // 4. => Remove styling and set text on the front 
//          setTimeout(function ( ) {  
//            // this seams to ONLY happen on the very last character
//            // remove the Timeout, and the effect is reversed
//            // with only the TOP changing, and not the bottoms
//            // BUT, it does happen sequentialy according to console.log
//   
//           $(position+" .back, "+position+" .front, "+position+" .flap, "+position+" .bottom, "+position+" .shadow, "+position+" .top_back_shadow").removeAttr("style");
//    
//    //$(" .back, .front, .flap, .bottom, .shadow, .top_back_shadow").removeAttr("style");
//             $(position+" .front h1" ).text( rando );
//             // ^ again, above works OUTSIDE of setTimeout, but reverts ( due to other timeings?)
//         }, reset_delay);  
//     // $(position+" .front h1" ).text( rando );
//     // setFrontH1(position, rando, reset_delay)
//   
//   };  // END of change_character function
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   
//   //$(position+" .front h1" ).text( rando );
//   function setFrontH1(positionX, randoX, reset_delayX) {
//     setTimeout(function ( ) {  
//       $(positionX+" .front h1" ).text( randoX );
//     }, reset_delayX);
//     console.log("COMPLETED VIA FUNCTION")
//   }
//   