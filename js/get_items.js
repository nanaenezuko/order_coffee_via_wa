$(document).ready(function () {
    number = 0;
    var items = [];
    var itemsLength = $("#items-length").text();
    console.log(itemsLength)
    for (i = 0; i < itemsLength; i++){
        $(".all-items .row").append("<div class='col-6 col-md-3'><div class='item-container'><div id='item_"+i+"' class='card item-card-list'>")
        $.getJSON( "items/item_"+(i+1)+".json", function( data ) {
            $("#item_"+number)
                .append("<img src='" + data["image"]+ "'>")
                .append("<h4 class='text-center menu-name' id='menu-name-"+number+"'>"+ data["name"].toUpperCase())
                .append("<p class='text-center' id='variant-item-"+number+"'>")
                .append("<div class='d-grid gap-2'><button id='btn-item-"+number+"' class='btn btn-outline-success' type='button' data-bs-toggle='modal' data-bs-target='#modal-add-list'>Add to Wishlist</button>")
            var variant = data["variant"]
            var price = []
            var variant_name = []
            $.each(variant, function (indexInArray, valueOfElement) {
                price.push(valueOfElement["price"])
                variant_name.push(valueOfElement["name"])
            });
            price.sort(function (a, b ) {return a- b })
            $("#variant-item-"+number)
                .append(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price[0]))
            if (price.length > 1){
                $("#variant-item-"+number)
                    .append(" - ")
                    .append(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price[price.length-1]));
            }
            $("#btn-item-"+number).on("click", function () {
                $("#modal-title-name").text(data["name"]);
                $("#img-item-modal").attr("src", data["image"]);
                $(".radio-choice").empty();
                for (variant_name_index = 0; variant_name_index < variant_name.length; variant_name_index++){
                    $(".radio-choice").append("<div class='form-check' id='form-check-"+variant_name_index+"'>");
                    $("#form-check-"+variant_name_index)
                        .append("<input class='form-check-input' type='radio' name='variant-radio' id='variant-radio-"+variant_name_index+"' value='"+variant_name[variant_name_index]+"' harga='"+ price[variant_name_index]+"'>")
                        .append("<label class='form-check-label' for='variant-radio-"+variant_name_index+"'>"+variant_name[variant_name_index] + " " + new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price[variant_name_index]));
                }
            });
            items[number] = data;
            number++
        });
    }
  //   setTimeout(() => {
  //     $("#btn-add-to-list").on("click", function() {
  //       if ($('input[name="variant-radio"]:checked').val() != null) {
  //           var name_of_menu = $("#modal-title-name").text();
  //           name_of_menu = name_of_menu.replace(/\s/g, '');
  //           if ($("[id='"+name_of_menu+"']").length != 0) {
  //             var amount_value = $("[id='"+name_of_menu+"']").find($("td")[3]).text();
  //             amount_value = parseInt(amount_value);
  //             $("[id='"+name_of_menu+"']").find($("td")[3]).text(amount_value + parseInt($("#amount-order").val()));
  //           } else {
  //             $('#modal-item-wishlist')
  //               .append("<tr id='"+ name_of_menu +"'><td>" + $("#modal-title-name").text() + "<td>" + $('input[name="variant-radio"]:checked').val() + "<td>" + $('input[name="variant-radio"]:checked').attr("harga") + "<td>" + $("#amount-order").val() + "<td><button onclick='remove_id(/"+name_of_menu+"/)' class='btn btn-outline-danger btn-delete-menu' id='btn"+ name_of_menu +"'><img src='icon/Trash-can-icon.png' class='text-end'>");
  //           }
  //           $("#toast-message").text($("#modal-title-name").text() + " '"+ $('input[name="variant-radio"]:checked').val() +"' "+ $("#amount-order").val() +" item, Successfully add to WishList");
  //           var toast = new bootstrap.Toast($("#liveToast"));
  //           toast.show();
  //           $("#amount-order").val(1);
  //           $("#wishlist-amount").text($("#modal-item-wishlist tr").length);
  //       } else {
  //         alert("Silahkan pilih variant terlebih dahulu");
  //       }
  //   });
  // }, 2000)
});

$("#btn-add-to-list").on("click", function() {
  if ($('input[name="variant-radio"]:checked').val() != null) {
      var name_of_menu = $("#modal-title-name").text();
      name_of_menu = name_of_menu.replace(/\s/g, '');
      name_of_menu += $('input[name="variant-radio"]:checked').val();
      if ($("#"+name_of_menu).length != 0) {
        var amount_value = $("#"+name_of_menu).find($("td.total")).text();
        amount_value = parseInt(amount_value) + parseInt($("#amount-order").val());
        $("#"+name_of_menu).find($("td.total")).text(amount_value);
      } else {
        $('#modal-item-wishlist')
          .append("<tr index='"+$("#modal-item-wishlist tr").length+"' id='"+ name_of_menu +"'><td class='name_item'>" + $("#modal-title-name").text() + "<td class='variant'>" + $('input[name="variant-radio"]:checked').val() + "<td class='total'>" + $("#amount-order").val() + "<td class='price'>" + $('input[name="variant-radio"]:checked').attr("harga") + "<td><button onclick='remove_id(/"+name_of_menu+"/)' class='btn btn-outline-danger btn-delete-menu' id='btn"+ name_of_menu +"'><img src='icon/Trash-can-icon.png' class='text-end'>");
      }
      item_price = parseInt($('input[name="variant-radio"]:checked').attr("harga"));
      amount_of_order = parseInt($("#"+name_of_menu).find("td.total").text());
      $("#"+name_of_menu).find($("td.price")).text(item_price * amount_of_order);
      $("#toast-message").text($("#modal-title-name").text() + " '"+ $('input[name="variant-radio"]:checked').val() +"' "+ $("#amount-order").val() +" item, Successfully add to WishList");
      var toast = new bootstrap.Toast($("#liveToast"));
      toast.show();
      $("#amount-order").val(1);
      $("#wishlist-amount").text($("#modal-item-wishlist tr").length);
  } else {
    alert("Silahkan pilih variant terlebih dahulu");
  }
});

$("#btn-order").on('click', function(){
  link_wa = $("#linkFirst").text();
  link_wa += $("#username").text();
  index_of_tr = 0;
  var item_name = $(".name_item");
  var item_variant = $(".variant");
  var item_amount = $(".total");
  var item_total_price = $(".price");
  while (true) {
    if ($("tr[index='"+index_of_tr+"']").length != 0) {
      link_wa += (index_of_tr + 1)+ ". " + $("tr[index='"+index_of_tr+"']").find(item_name).text() + "%20";
      link_wa += $("tr[index='"+index_of_tr+"']").find(item_variant).text() + "%20";
      link_wa += $("tr[index='"+index_of_tr+"']").find(item_amount).text() + ",%20 Rp.";
      link_wa += $("tr[index='"+index_of_tr+"']").find(item_total_price).text() + "%0A";
      index_of_tr++;
    } else {
      break;
    }
  }
  link_wa +=  $("#linkLast").text();
  window.location.href = link_wa;
})

var myModal = new bootstrap.Modal(document.getElementById('modal-username'), {
  keyboard: false
})
myModal.show()

$("#btn-save-name").on("click", function(){
  username = $("#username-input").val();
  if (username == "") {
    alert("Nama tidak boleh kosong");
  } else {
    $("#username").text('"*' + username + '*"%0A');
    myModal.hide();
  }
})

function remove_id(name_of_row){
  var new_text = String(name_of_row);
  new_text = new_text.slice(1, -1);
  $("tr#"+new_text).remove();
  $("#wishlist-amount").text($("#modal-item-wishlist tr").length);
  console.log(new_text);
  // $("#" + name_of_row).remove();
}
