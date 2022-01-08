<?php
    $items = scandir('items', 1);
    $index = 0;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/app.css">
    <title>Shop</title>
</head>
<body>
    <?php foreach ($items as $item) {
        if ($item != "." && $item != ".."){
            $index++;
        } else {
            break;
        }?>
    <?php } ?>
    <p id="items-length" hidden><?php echo $index; ?></p>
    <div class="container-fluid main">
        <div class="all-items">
            <div class="row">
            </div>
        </div>
        <nav class="navbar fixed-bottom navbar-light bg-light">
            <div class="container-fluid">
                <h4>My Caffee</h4>
                <ul class="nav justify-content-end">
                    <li class="nav-item">
                        <div class="card">
                            <button class="btn btn-outline-success btn-sm" id="btn-wishlist" data-bs-toggle="modal" data-bs-target="#modal-wishlist">
                                <div class="row">
                                    <div class="col-6">
                                        <img src="icon/cart.ico" id="cart-image" class="img-fluid">
                                    </div>
                                    <div class="col-6">
                                        <h5 class="text-center" id="wishlist-amount" style="color: red;">0</h5>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <p id='linkFirst' hidden>https://wa.me/+62895620482882?text=Pesanan%20</p>
        <p id='username' hidden></p>
        <p id='linkLast' hidden>*Silahkan%20Ke%20Kasir%20Untuk%20Melakukan%20Pembayaran*</p>
    </div>

    <!-- Modal Item -->
    <div class="modal fade" id="modal-add-list" tabindex="-1" aria-labelledby="modal-add-list" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title-name">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-item-container">
                        <div class="card modal-item" id="modal-content">
                            <img src="" alt="" id="img-item-modal" class="img-fluid img-modal-item">
                            <br>
                            <h5>Variant</h5>
                            <div class="radio-choice"></div>
                            <h6>Jumlah</h6>
                            <input class="form-control" type="number" placeholder="Jumlah" value="1" id="amount-order">
                            <br>
                            <div class="d-grid gap-2 col-6 mx-auto">
                              <button class="btn btn-success" type="button" id="btn-add-to-list">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Toast -->
                <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                      <img src="icon/cart.ico" class="rounded me-2" alt="...">
                      <strong class="me-auto">Added</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body" id="toast-message">
                      the Item Successfully added to WishList
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal WishList -->
    <div class="modal fade" id="modal-wishlist" tabindex="-1" aria-labelledby="modal-wishlist" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Wish List</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-wishlist-container">
                        <div class="card modal-item" >
                          <table class="table table-striped align-middle">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Variant</th>
                                <th>Amount</th>
                                <th colspan="2">Price</th>
                              </tr>
                            </thead>
                            <tbody id="modal-item-wishlist">

                            </tbody>
                          </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" id="btn-order">Pesan Via Whatsapp</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Username -->
    <div class="modal fade" id="modal-username" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-username-title">Username</h5>
          </div>
          <div class="modal-body">
            <input class="form-control form-control-sm" type="text" placeholder="Masukan Nama" id='username-input'>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btn-save-name">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- source -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/get_items.js" type="text/javascript"></script>
</body>
</html>
