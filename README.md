//Get values in react-hook-form is a function that gives us all the values

// Watch is a method that can be used to watch all the fields and changed values "
  1. We can pass a field to particularly watch that field
  2. We can invoke the function like watch() to watch all the fields
  3. We can specify a callback function that recieves the values as an argument


// register function returns an object and takes 2 arguments:
   1. The field name that is to be registered 
   2. options parameter that can be used for validation and specifying certain rules

// the form state objects contains several useful methods 
   1. errors -this method contain all the errors for each field with the message we have 
      specified.

   2. touched fields and dirty fields 

   3. isDirtyFlag - to know if the value of the field has changed or not

   4. isSubmittingflag that becomes true when the form is getting submitted and again becomes false after successfully submitted