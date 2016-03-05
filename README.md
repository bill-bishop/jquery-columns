# jquery-columns
jQuery plugin to reshuffle DOM elements to appear in downward-flowing columns

Include the script on your page:
  
    <script src="jquery-columns.min.js"></script>
  
  
And tell an element to sort its children into columns:
  
    $('ul').columns(3);
    
# Placeholders
  

Placeholder elements are needed to give the appearance of downwards-flowing columns - if you don't specify one, an empty `div` will be used.

If you want to specify the element to be used for empty row slots, include an element with a `placeholder` class (or specify the placeholderClass you want to use in the options): 

    <li class="placeholder"></li>
  
This is useful when sorting `li`s or some other semantic elements which would be inappropriate to replace with `div`s
  
# Demo
See a demo here: http://the402.net/jquery/jquery-columns/demos


# API

    
    jQuery.fn.columns (cols, options)
        
        cols        - the number of columns to organize the elements into   
        options     - (optional) object. see below configurable properties:
        
            reorder             - if explicitly set to false, 
                                    will not refer back to the original element order on subsequent .columns() calls
                                    useful for deferring to angular etc. for maintaining the original element order
                                    
            placeholderClass    - defaults to 'placeholder'
                                    the class name of the element to use for row placeholders
            
            style               - defaults to { width: 100 / cols + '%', display: 'inline-block' }
                                    fn called with # cols, return value is passed to jQuery.fn.css on each element
