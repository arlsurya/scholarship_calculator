

        function loadTable() {
            console.log("function");
            $("#tableBody").html("");
            $.ajax({
                url: 'http://localhost/2079.07.19/api-fetch-all.php',
                type: 'GET',
                success: function (data) {
                    if (data.status == false) {
                        //if input fields are emtpy
                        $("#contactTable").append("<tr><td colspan='3' class='text-center'>" + data.message + "   </td></tr> ")
                    } else {
                               //if input fields are not empty
                                
                                // console.log(data);
                                var data_arr = [];
        
                                for(var count = 0; count < data.length; count++) {
                            var sub_array = {
                                'name' : data[count].name,
                                'contact' : data[count].contact,
        
                                'action' : '<button type="button" class="btn btn-success btn-sm edit edittemplate" data-id="'+data[count].id+'">Edit</button>&nbsp<button type="button" class="btn btn-danger btn-sm del deletetemplate" data-id="'+data[count].id+'">Delete</button>'
                            };
                
                            data_arr.push(sub_array);
                            // console.log(sub);
                            // console.log(data);
                        }
        
                                
        
        
                                $("#contactTable").DataTable({
                                    data: data_arr,
                                    order: [],
                                    columns: [
                                        {data:'name'},
                                        {data:'contact'},
                                        {data:'action'}
                                        
                                    ]
                                })
        
        
        
                    }
                }
            });

        }

        // add data function

        function jsonData(targetForm) {
            var arr = $(targetForm).serializeArray();
            var obj = {};
            //empty value return false
            for (var a = 0; a < arr.length; a++) {
                if (arr[a].value == "") {
                    return false;
                }
                obj[arr[a].name] = arr[a].value;
            }


            JSONstring = JSON.stringify(obj);

            console.log(JSONstring);
            return JSONstring;

            
        }
        // function end 

        // show success or error
        function message(message, status) {
            if (status == true) {
                $("#success-message").html(message).slideDown();
                $("#error-message").slideUp();
                setTimeout(function () {
                    $("#success-message").slideUp();

                },
                    4000)
            } else if (status == false) {
                $("#error-message").html(message).slideDown();
                $("#success-message").slideUp();
                setTimeout(function () {
                    $("#error-message").slideUp();

                },
                    4000)
            }
            console.log("test3");
        }


        function addData (){
            
           
                var jsonObj = jsonData("#tableAddContactForm");
                console.log(jsonObj);

                if (jsonObj == false) {

                    message("All Fields are required.", false);
                } else {


                    $.ajax({
                        url: 'http://localhost/2079.07.17/api-insert.php',
                        type: 'POST',
                        data: jsonObj,
                        success: function (data) {

                            message(data.message, data.status);

                            if (data.status == true) {

                                $('#tableAddContactForm')[0].reset();

                                // $("#tableBody").html("");
                                // loadTable();
                                // destroy()
                                // loadTable();
                                $('#action_modal').modal('hide');
                                console.log("adddata")



                            } else {
                                message("Contact Record Not Inserted.", false);
                            }
                        }

                    })



                }




            ;
        }


        function editData(){
         
            
            
            $(document).on('click', '.edit', function () {


                $('#dynamic_modal_title1').text('Edit Data');

                // $('#action').val('Edit');

                $('#submitForm1').text('Update');

                $('.text-danger').text('');

                $('#action_modal1').modal('show');


                var contactId = $(this).data("id");
                // console.log(contactId);

                var obj = { cid: contactId };
                var myJSON = JSON.stringify(obj);

                console.log(myJSON);

                // edit ma fetch single data 
                $.ajax({

                    url: 'http://localhost/2079.07.17/api-fetch-single.php',
                    type: 'POST',
                    data: myJSON,
                    success: function (data) {

                        $("#manageContactTableName1").val(data[0].name);
                        $("#manageContactTableContact1").val(data[0].contact);
                    }
                })

                // update old data code here 

                $("#submitForm1").on("click", function () {

                    var arr = $("#tableAddContactForm1").serializeArray();
                    var obj1 = obj;

                    //empty value return false
                    for (var a = 0; a < arr.length; a++) {
                        if (arr[a].value == "") {
                            return false;
                        }
                        obj1[arr[a].name] = arr[a].value;
                    }
                    console.log(myJSON);

                    JSONstring = JSON.stringify(obj1);
                    console.log(JSONstring);



                    $.ajax({
                        url: 'http://localhost/2079.07.19/api-update.php',
                        type: 'POST',
                        data: JSONstring,
                        success: function (data) {
                            
                            if (data.status == true) {
                                
                                $('#action_modal1').modal('hide');
                                
                                $('#tableAddContactForm1')[0].reset();
                                
                                // loadTable();
                                console.log(data);
                                message("Contact Record is Updated.", true);

                            }else{
                                message("Contact Record is not Updated.", false);
                            }




                        }
                    })

                })
            })
        }


        function deleteData(){
            
            $(document).on('click', '.del', function () {



                var id = $(this).data('id');

                var obj = { cid: id };
                var myJSON = JSON.stringify(obj);
                console.log(myJSON);

                if (confirm("do you want to delete this record")) {

                    $.ajax({
                        url: 'http://localhost/2079.07.17/api-delete.php',
                        type: 'DELETE',
                        data: myJSON,
                        success: function (data) {


                            message(data.message, data.status);
                            if (data.status == true) {



                                    destroy()
                                loadTable();
                                console.log("deleted");
                            }


                        }

                    })
                }


            })
        }

        function destroy(){
            $('#contactTable').DataTable().destroy();
            $('#tableBody').text("");
        }

        function loadTemplate(){

            $.ajax({
                url: 'http://localhost/2079.07.17/apifortemp/api-fetch-all.php',
                type: 'GET',
                success: function (data) {
                    if (data.status == false) {
                        //if input fields are emtpy
                        $("#templateTable").append("<tr><td colspan='3' class='text-center'>" + data.message + "   </td></tr> ")
                    } else {
                        //if input fields are not empty
                        $.each(data, function (key, value) {
                            $("#templateTable").append("<tr>" + "<td>" + value.name + "</td>" + "<td>" + value.template + "</td>" + "<td> <button class='btn btn-primary edit' data-eid ='" + value.id + "'>Edit</button>" + "<button class='btn btn-danger del' data-id = '" + value.id + "'>Delete</button></td>" + "</tr>");


                        });

                    }
                }
            });
        }

        function modalbtn(){
            $('#tableAddBtn').on('click', function () {

                $('#dynamic_modal_title').text('Add Template');

                $('#tableAddTemplateForm')[0].reset();

                $('#submitForm').text('Add');

                $('.text-danger').text('');

                $('#action_modal').modal('show');

            });
        }

        function submitcontform(){
            
            $("#submitForm").on("click", function (e) {
                e.preventDefault();
                var jsonObj = jsonData("#tableAddTemplateForm");
                console.log(jsonObj);

                if (jsonObj == false) {

                    message("All Fields are required.", false);
                } else {


                    $.ajax({
                        url: 'http://localhost/2079.07.17/apifortemp/api-insert.php',
                        type: 'POST',
                        data: jsonObj,
                        success: function (data) {

                            message(data.message, data.status);

                            if (data.status == true) {

                                $('#tableAddTemplateForm')[0].reset();

                                $("#tableBody").html("");
                                // loadTable();
                                $('#action_modal').modal('hide');



                            } else {
                                message("Template Record Not Inserted.", false);
                            }
                        }

                    })



                }




            });
        }
       function submittempform(){
        
        $("#submitForm").on("click", function (e) {
            e.preventDefault();
            var jsonObj = jsonData("#tableAddTemplateForm");
            console.log(jsonObj);

            if (jsonObj == false) {

                message("All Fields are required.", false);
            } else {


                $.ajax({
                    url: 'http://localhost/2079.07.17/apifortemp/api-insert.php',
                    type: 'POST',
                    data: jsonObj,
                    success: function (data) {

                        message(data.message, data.status);

                        if (data.status == true) {

                            $('#tableAddTemplateForm')[0].reset();

                            // $("#tableBody").html("");
                            // loadTable();
                            $('#action_modal').modal('hide');



                        } else {
                            message("Template Record Not Inserted.", false);
                        }
                    }

                })



            }




        });
       }

       function edittempform(){
        $(document).on('click', '.edit', function () {


            $('#dynamic_modal_title1').text('Edit Template');

            // $('#action').val('Edit');

            $('#submitForm1').text('Update');

            $('.text-danger').text('');

            $('#action_modal1').modal('show');


            var contactId = $(this).data("id");
            console.log(contactId);

            var obj = { cid: contactId };
            var myJSON = JSON.stringify(obj);

            console.log(myJSON);

            // edit ma fetch single data 
            $.ajax({

                url: 'http://localhost/2079.07.17/apifortemp/api-fetch-single.php',
                type: 'POST',
                data: myJSON,
                success: function (data) {

                    $("#manageTemplateTableName1").val(data[0].name);
                    $("#manageTemplateTableContact1").val(data[0].template);
                }
            })

            // update old data code here 

            $("#submitForm1").on("click", function () {

                var arr = $("#tableAddTemplateForm1").serializeArray();
                var obj1 = obj;

                //empty value return false
                for (var a = 0; a < arr.length; a++) {
                    if (arr[a].value == "") {
                        return false;
                    }
                    obj1[arr[a].name] = arr[a].value;
                }
                // console.log(myJSON);

                JSONstring = JSON.stringify(obj1);
                console.log(JSONstring);



                $.ajax({
                    url: 'http://localhost/2079.07.17/apifortemp/api-update.php',
                    type: 'POST',
                    data: JSONstring,
                    success: function (data) {
                        
                        if (data.status == true) {

                            $('#action_modal1').modal('hide');

                            $('#tableAddTemplateForm1')[0].reset();

                            // loadTable();
                            console.log(data);
                            message("Template Record is Updated.", true);

                        } else {
                            message("Template Record is not Updated.", false);
                        }




                    }
                })

            })
        })
       }

       function deletetemplateform(){
        

        $(document).on('click', '.del', function () {



            var id = $(this).data('id');

            var obj = { cid: id };
            var myJSON = JSON.stringify(obj);
            console.log(myJSON);

            if (confirm("do you want to delete this record")) {

                $.ajax({
                    url: 'http://localhost/2079.07.17/apifortemp/api-delete.php',
                    type: 'DELETE',
                    data: myJSON,
                    success: function (data) {


                        message(data.message, data.status);
                        if (data.status == true) {




                            // loadTable();
                            console.log("deleted");
                        }


                    }

                })
            }


        })
       }


       function loadTabletemplate() {
        console.log("function");
        $("#tableBody").html("");
        $.ajax({
            url: 'http://localhost/2079.07.17/apifortemp/api-fetch-all.php',
            type: 'GET',
            success: function (data) {
                if (data.status == false) {
                    //if input fields are emtpy
                    $("#templateTable").append("<tr><td colspan='3' class='text-center'>" + data.message + "   </td></tr> ")
                } else {
                           //if input fields are not empty
                            
                            // console.log(data);
                            var data_arr = [];
    
                            for(var count = 0; count < data.length; count++) {
                        var sub_array = {
                            'name' : data[count].name,
                            'template' : data[count].template,
    
                            'action' : '<button type="button" class="btn btn-success btn-sm edit edittemplate" data-id="'+data[count].id+'">Edit</button>&nbsp<button type="button" class="btn btn-danger btn-sm del deletetemplate" data-id="'+data[count].id+'">Delete</button>'
                        };
            
                        data_arr.push(sub_array);

                        console.log(data_arr);
                        // console.log(sub);
                        // console.log(data);
                    }
    
                            
    
    
                            $("#templateTable").DataTable({
                                data: data_arr,
                                order: [],
                                columns: [
                                    {data:'name'},
                                    {data:'template'},
                                    {data:'action'}
                                    
                                ]
                            })
    
    
    
                }
            }
        });

    }

    function destroytemplate(){
        
            $('#templateTable').DataTable().destroy();
            $('#tableBody').text("");
        }
    

        

        function loadReportTable(){
            $("#tableBody").html("");
            $.ajax({
                url: 'http://localhost/2079.07.19/api-fetch-all-report.php',
                type: 'GET',
                success: function (data) {
                    if (data.status == false) {
                        //if input fields are emtpy
                        $("#reportTable").append("<tr><td colspan='3' class='text-center'>" + data.message + "   </td></tr> ")
                    } else {
                               //if input fields are not empty
                               console.log(data);
                                
                                // console.log(data);
                                var data_arr = [];
        
                                for(var count = 0; count < data.length; count++) {
                            var sub_array = {
                                'sender' : data[count].sender,
                                'number' : data[count].number,
                                'message' : data[count].message,
                                'status' : data[count].message,
                                
        
        
                                'action' : '<button type="button" class="btn btn-danger btn-sm del deletetemplate" data-id="'+data[count].id+'">Delete</button>'
                            };
                
                            data_arr.push(sub_array);
                            // console.log(sub);
                            // console.log(data);
                        }
        
                                
        
        
                                $("#reportTable").DataTable({
                                    data: data_arr,
                                    order: [],
                                    columns: [
                                        {data:'sender'},
                                        {data:'number'},
                                        {data:'message'},
                                        {data:'status'},
                                        {data:'action'}
                                        
                                    ]
                                })
        
        
        
                    }
                }
            });
        
        }

        function delReport(){
            
            $(document).on('click', '.del', function () {



                var id = $(this).data('id');

                var obj = { cid: id };
                var myJSON = JSON.stringify(obj);
                console.log(myJSON);

                if (confirm("do you want to delete this record")) {

                    $.ajax({
                        url: 'http://localhost/2079.07.19/api-delete-report.php',
                        type: 'DELETE',
                        data: myJSON,
                        success: function (data) {


                            message(data.message, data.status);
                            if (data.status == true) {




                                // loadTable();
                                console.log("deleted");
                            }


                        }

                    })
                }


            })


        }

        function loadTemplateTable() {
            
            $.ajax({
                url: 'http://localhost/2079.07.19/api-fetch-all-temp.php',
                type: 'GET',
                success: function (data) {
                    if (data.status == false) {
                        //if input fields are emtpy
                        $("#sample_data").append("<tr><td colspan='3' class='text-center'>" + data.message + "   </td></tr> ")
                    } else {

                        
                
                        //if input fields are not empty
                        
                        // console.log(data);
                        var data_arr = [];

                        for(var count = 0; count < data.length; count++) {
                    var sub_array = {
                        'name' : data[count].name,
                        'template' : data[count].template,

                        'action' : '<button type="button" class="btn btn-success btn-sm add addtemplate" data-id="'+data[count].id+'">Add</button>'
                    };
        
                    data_arr.push(sub_array);
                    // console.log(data_arr);
                    // console.log(data);
                }

                        


                        $("#sample_data").DataTable({
                            data: data_arr,
                            order: [],
                            columns: [
                                {data:'name'},
                                {data:'template'},
                                {data:'action'}
                                
                            ]
                        })



                        

                    }
                }
            });

        }

        function loadContactTableList() {
            
            $.ajax({
                url: 'http://localhost/2079.07.19/api-fetch-all.php',
                type: 'GET',
                success: function (data) {
                    // console.log(data)
                    if (data.status == false) {
                        //if input fields are emtpy
                        $("#addcontacttable").append("<tr><td colspan='3' class='text-center'>" + data.message + "   </td></tr> ")
                    } else {

                        
                
                        //if input fields are not empty
                        
                        // console.log(data);
                        var data_arr = [];

                        for(var count = 0; count < data.length; count++) {
                    var sub_array = {
                        'name' : data[count].name,
                        'contact' : data[count].contact,

                        'action' : '<button type="button" class="btn btn-success btn-sm add" data-id="'+data[count].id+'">Add</button>'
                    };
        
                    data_arr.push(sub_array);
                    // console.log(data_arr);
                    // console.log(data);
                }

                        


                        $("#addcontacttable").DataTable({
                            data: data_arr,
                            order: [],
                            columns: [
                                {data:'name'},
                                {data:'contact'},
                                {data:'action'}
                                
                            ]
                        })



                        

                    }
                }
            });

        }
        

        function addContactTable(){
            $(document).on( 'click', '.add', function (){
            var contactId = $(this).data("id");
            
            var obj = { cid: contactId };
            
            var myJSON = JSON.stringify(obj)
            console.log(myJSON);
            
        
            
            $.ajax({
                url: 'http://localhost/2079.07.19/api-fetch-single-contact.php',
                            type: 'POST',
                            data: myJSON,
                            success: function (data){
                                console.log(data);
                                $("#last_name1").val(data[0].contact);
                                $('#exampleModal').modal('hide');
        
                            }
        
            })

            
        });
        
        }


        function addTemplateTable() {
            
            $.ajax({
                url: 'http://localhost/2079.07.19/api-fetch-all-temp.php',
                type: 'GET',
                success: function (data) {
                    if (data.status == false) {
                        //if input fields are emtpy
                        $("#addtemplatetable").append("<tr><td colspan='3' class='text-center'>" + data.message + "   </td></tr> ")
                    } else {

                        
                
                        //if input fields are not empty
                        
                        // console.log(data);
                        var data_arr = [];

                        for(var count = 0; count < data.length; count++) {
                    var sub_array = {
                        'name' : data[count].name,
                        'template' : data[count].template,

                        'action' : '<button type="button" class="btn btn-success btn-sm add addtemplate" data-id="'+data[count].id+'">Add</button>'
                    };
        
                    data_arr.push(sub_array);
                    // console.log(data_arr);
                    // console.log(data);
                }

                        


                        $("#addtemplatetable").DataTable({
                            data: data_arr,
                            order: [],
                            columns: [
                                {data:'name'},
                                {data:'template'},
                                {data:'action'}
                                
                            ]
                        })



                        

                    }
                }
            });

        }


        function destroyTemplateTable(){
            $('#addtemplatetable').DataTable().destroy();
            $('#tableBody').text("");
        }
        function destroyContactTable(){
            $('#addcontacttable').DataTable().destroy();
            $('#tableBody').text("");
        }

       

        function addTemplateForm(){
            $(document).on( 'click', '.addtemplate', function (){
                console.log("tempform");

                var contactId = $(this).data("id");
    console.log(contactId);
    
    var obj = { tid: contactId };
    
    var myJSON = JSON.stringify(obj)
    console.log(myJSON);

    $.ajax({
        url: 'http://localhost/2079.07.19/api-fetch-single-temp.php',
                    type: 'POST',
                    data: myJSON,
                    success: function (data){
                        $("#last_name").val(data[0].template);
                        $('#exampleModalCenter1').modal('hide');

                    }

    })
            
            })
        
        }


        function barfun(){
            // Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
        }




        function ajaxrun(){
        $.ajax({
            url: 'http://localhost/2079.07.19/api-fetch-all-count.php',
            type: 'GET',
            success: function(data){
                
                var a = data;
                console.log(a);
                return a
            }
            
            
          });
          
        }

        function statDataFetch(){

            $.ajax({
                url: 'http://localhost/2079.07.19/api-count-jan.php',
                type: 'GET',
                success: function(data1){
                    var jan = data1;
                    console.log(jan);

                    // feb

                    $.ajax({
                        url: 'http://localhost/2079.07.19/api-count-feb.php',
                        type: 'GET',
                        success: function(data2){
                            var feb = data2;
                            console.log(feb);

                            // mar
                            $.ajax({
                                url: 'http://localhost/2079.07.19/api-count-march.php',
                                type: 'GET',
                                success: function(data3){
                                    var mar = data3;
                                    console.log(data3);

                                    // april

                                    $.ajax({
                                        url: 'http://localhost/2079.07.19/api-count-april.php',
                                        type: 'GET',
                                        success: function(data4){
                                            var april = data4;
                                            console.log(april);

                                            //may

                                            $.ajax({
                                                url: 'http://localhost/2079.07.19/api-count-may.php',
                                                type: 'GET',
                                                success: function(data5){
                                                    var may = data5;
                                                    console.log(may);

                                                    //june

                                                    $.ajax({
                                                        url: 'http://localhost/2079.07.19/api-count-june.php',
                                                        type: 'GET',
                                                        success: function(data6){
                                                            var june = data6;
                                                            console.log(june);


                                                            //july
                                                            $.ajax({
                                                                url: 'http://localhost/2079.07.19/api-count-july.php',
                                                                type: 'GET',
                                                                success: function(data7){
                                                                    var july = data7;
                                                                    console.log(july);


                                                                    //aug

                                                                    $.ajax({
                                                                        url: 'http://localhost/2079.07.19/api-count-aug.php',
                                                                        type: 'GET',
                                                                        success: function(data8){
                                                                            var aug = data8;
                                                                            console.log(aug);

                                                                            //sep

                                                                            $.ajax({
                                                                                url: 'http://localhost/2079.07.19/api-count-sep.php',
                                                                                type: 'GET',
                                                                                success: function(data9){
                                                                                    var sep = data9;
                                                                                    console.log(sep);


                                                                                    //oct
                                                                                    $.ajax({
                                                                                        url: 'http://localhost/2079.07.19/api-count-oct.php',
                                                                                        type: 'GET',
                                                                                        success: function(data10){
                                                                                            var oct = data10;
                                                                                             console.log(oct);

                                                                                             //nov

                                                                                             $.ajax({
                                                                                                url: 'http://localhost/2079.07.19/api-count-nov.php',
                                                                                                type:'GET',
                                                                                                success: function(data11){
                                                                                                    var nov = data11;
                                                                                                    console.log(nov);

                                                                                                    //dec

                                                                                                    $.ajax({
                                                                                                        url: 'http://localhost/2079.07.19/api-count-dec.php',
                                                                                                        type: 'GET',
                                                                                                        success: function(data12){
                                                                                                            var dec = data12;
                                                                                                            console.log(dec);



                                                                                                            if(data1==""){
                                                                                                                console.log("api data is empty");
                                                                                                            }else{

   // line chart shown 
                                                                                                                
          var myLineChart = new Chart('myAreaChart', {
            type: 'line',
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [{
                label: "Sent Message",
                
               
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data:['0',jan,'1',feb ] ,
              }],
            },
            options: {
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
                }
              },
              scales: {
               
              },
           
            }
          });


        //   bar chart shown 
        
        var myBarChart = new Chart('myBarChart', {
            type: 'bar',
            data: {
              labels: ["January", "February", "March", "April", "May", "June",'July','August','September','October','November', 'December'],
              datasets: [{
                label: "Send SMS",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                data:['0', jan , '1', jan] , //insert data from database
                
              }],
            },
            options: {
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
                }
              },
              scales: {
                // xAxes: [{
                //   time: {
                //     unit: 'month'
                //   },
                //   gridLines: {
                //     display: false,
                //     drawBorder: false
                //   },
                //   ticks: {
                //     maxTicksLimit: 6
                //   },
                //   maxBarThickness: 25,
                // }],
                // yAxes: [{
                //   ticks: {
                //     min: 0,
                //     max: 15000,
                //     maxTicksLimit: 5,
                //     padding: 10,
                //     // Include a dollar sign in the ticks
                //     callback: function(value, index, values) {
                //       return '' + number_format(value);
                //     }
                //   },
                //   gridLines: {
                //     color: "rgb(234, 236, 244)",
                //     zeroLineColor: "rgb(234, 236, 244)",
                //     drawBorder: false,
                //     borderDash: [2],
                //     zeroLineBorderDash: [2]
                //   }
                // }],
              },
            //   legend: {
            //     display: false
            //   },
            //   tooltips: {
            //     titleMarginBottom: 10,
            //     titleFontColor: '#6e707e',
            //     titleFontSize: 14,
            //     backgroundColor: "rgb(255,255,255)",
            //     bodyFontColor: "#858796",
            //     borderColor: '#dddfeb',
            //     borderWidth: 1,
            //     xPadding: 15,
            //     yPadding: 15,
            //     displayColors: false,
            //     caretPadding: 10,
            //     callbacks: {
            //       label: function(tooltipItem, chart) {
            //         var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            //         return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
            //       }
            //     }
            //   },
            }
          });


        //   pie chart shown 
        var myPieChart = new Chart('myPieChart', {
            type: 'doughnut',
            data: {
              labels: ["Quick SMS", "Bulk SMS", "Schedule SMS"],
              datasets: [{
                data: [2000, 30, 15],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
              }],
            },
            options: {
              maintainAspectRatio: false,
            //   tooltips: {
            //     backgroundColor: "rgb(255,255,255)",
            //     bodyFontColor: "#858796",
            //     borderColor: '#dddfeb',
            //     borderWidth: 1,
            //     xPadding: 15,
            //     yPadding: 15,
            //     displayColors: false,
            //     caretPadding: 10,
            //   },
            //   legend: {
            //     display: false
            //   },
            //   cutoutPercentage: 80,
            },
          });

                                                                                                            }


                                                                                                        }
                                                                                                    })

                                                                                                }
                                                                                             })

                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })


                                                                }
                                                            })
                                                        }
                                                    })


                                                }
                                            })
                                        }
                                    })
                                }
                            })

                        }
                    })


                }
            })
        }