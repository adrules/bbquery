let form = `
    <div class="form-group">
      <textarea class="form-control" name="message" rows="5" placeholder="Wanna leave a message?"></textarea>
    </div>
    <button class="btn btn-success" id="join">Send request</button>
    <button class="btn btn-secondary" id="cancel">Cancel</button>`;

$('#join').on('click', () => {  
  $('#request').append(form);
  $('#join').prop('disabled', true);
  $('#cancel').on('click', () => {
    $('#join').prop('disabled', false);
    $('form').remove();
  })
});
