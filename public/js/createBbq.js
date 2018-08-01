let dishCounter = 1;
let drinkCounter = 1;
  
function addDish() {
  let dish = `
    <div class="card mb-3 mt-3 dish" data-count="${dishCounter}">
      <div class="card-body">
        <label>Name</label>
        <div class="form-row">
          <div class="col">
            <div class="form-group">
              <input type="text" class="form-control" name="dishes[${dishCounter}][name]" placeholder="Dish name">
            </div>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger deleteDishButton" onclick="deleteDish(event)">Delete dish</button>
          </div>
        </div>
      <label>Ingredients</label>
      <button type="button" class="btn btn-sm btn-success" id="ingredientButton" onclick="addIngredient(event.target)">Add ingredient</button>
      <div class="ingredients">
        <div class="form-row">
          <div class="col">
            <input type="text" class="form-control form-control-sm" name="dishes[${dishCounter}][ingredients][1][name]" placeholder="Ingredient name">
          </div>
          <div class="col">
            <input type="number" min="0.01" step="0.01" class="form-control form-control-sm" name="dishes[${dishCounter}][ingredients][1][ammount]" placeholder="Ammount">
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" id="ingredient.unit" name="dishes[${dishCounter}][ingredients][1][unit]" placeholder="Unit">
          </div>
          <div class="col">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">€</div>
              </div>
              <input type="number" min="0.01" step="0.01" name="dishes[${dishCounter}][ingredients][1][prize]" class="form-control form-control-sm" placeholder="Prize per Unit">
            </div>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteIngredient(event.target)">Delete ingredient</button>
          </div>
        </div>
      </div>
    </div>`;
  $("#dishes").append(dish);
  dishCounter++;
}

function deleteDish(event) {
  if($('.deleteDishButton').length > 1) {
    $(event.target).parents('.card').remove();
  }
}

function addIngredient(target) {
  let ingredientCount = $(target).siblings('.ingredients').children().length + 1;
  let dishNumber = $(target).parents('.dish').data('count');
  console.log(dishNumber);
  let ingredient = `
    <div class="form-row">
      <div class="col">
        <input type="text" class="form-control form-control-sm" name="dishes[${dishNumber}][ingredients][${ingredientCount}][name]" placeholder="Ingredient name">
      </div>
      <div class="col">
        <input type="number" min="0.01" step="0.01" class="form-control form-control-sm" name="dishes[${dishNumber}][ingredients][${ingredientCount}][ammount]" placeholder="Ammount">
      </div>
      <div class="col">
        <input type="text" class="form-control form-control-sm" id="ingredient.unit" name="dishes[${dishNumber}][ingredients][${ingredientCount}][unit]" placeholder="Unit">
      </div>
      <div class="col">
        <div class="input-group input-group-sm mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">€</div>
          </div>
          <input type="number" min="0.01" step="0.01" name="dishes[${dishNumber}][ingredients][${ingredientCount}][prize]" class="form-control form-control-sm" placeholder="Prize per Unit">
        </div>
      </div>
      <div class="col">
        <button type="button" class="btn btn-danger btn-sm" onclick="deleteIngredient(event.target)">Delete ingredient</button>
      </div>
    </div>`;
  $(target).siblings('.ingredients').append(ingredient);
}

function deleteIngredient(target) {
  if($(target).parents('.ingredients').children('.form-row').length > 1) {
    $(target).parents('.form-row').remove();
  }
}


function addDrink() {
  let drink = `
    <div class="form-row">
      <div class="col">
        <input type="text" class="form-control" name="drinks[${drinkCounter}][name]" placeholder="Drink name">
      </div>
      <div class="col">
        <input type="number" min="0.01" step="0.01" class="form-control" name="drinks[${drinkCounter}][amount]" placeholder="Ammount">
      </div>
      <div class="col">
        <input type="text" class="form-control" name="drinks[${drinkCounter}][unit]" placeholder="Unit">
      </div>
      <div class="col">
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">€</div>
          </div>
          <input type="number" min="0.01" step="0.01" name="drinks[${drinkCounter}][price]" class="form-control"  placeholder="Prize per Unit">
        </div>
      </div>
      <div class="col">
        <button type="button" class="btn btn btn-danger deleteDrinkButton" onclick="deleteDrink(event.target)">Delete drink</button>
      </div>
    </div>`;
  $("#drinks").find('.card-body').append(drink);
  drinkCounter++;
}

function deleteDrink(target) {
  if($('.deleteDrinkButton').length > 1) {
    $(event.target).parents('.form-row').remove();
  }
}

$('#addDishButton').on('click', addDish);
$('#drinkButton').on('click', addDrink);

addDish();
addDrink();
