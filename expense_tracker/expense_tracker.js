    let entries = [];
    let activeFilter = "all";
    let editId = null;

    let editSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>';
    let deleteSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';

    // Initialize the app when DOM is ready
    document.addEventListener("DOMContentLoaded", function() {
      loadFromStorage();
      calculateTotals();
      showEntries();
      setupForm();
      setupFilters();
      setupDefaultDate();
    });

    function saveToStorage() {
      let json = JSON.stringify(entries);
      localStorage.setItem("stackone_expenses", json);
    }

    function loadFromStorage() {
      let saved = localStorage.getItem("stackone_expenses");
      if (saved !== null) {
        entries = JSON.parse(saved);
      } else {
        loadMockData();
      }
    }

    function loadMockData() {
      entries = [
        { id: 1, description: "Client Project Payment", amount: 3200, type: "income", date: "2026-06-01" },
        { id: 2, description: "Office Rent", amount: 1200, type: "expense", date: "2026-06-03" },
        { id: 3, description: "SaaS Cloud Subscriptions", amount: 150, type: "expense", date: "2026-06-05" }
      ];
      saveToStorage();
    }

    function calculateTotals() {
      let totalIncome = 0;
      let totalExpense = 0;
      entries.forEach(function(entry) {
        let val = parseFloat(entry.amount);
        if (entry.type === "income") {
          totalIncome = totalIncome + val;
        } else {
          totalExpense = totalExpense + val;
        }
      });
      updateTotalsDisplay(totalIncome, totalExpense);
    }

    function updateTotalsDisplay(totalIncome, totalExpense) {
      let balance = totalIncome - totalExpense;
      let balanceEl = document.querySelector("#exp-total-balance");
      setText(balanceEl, "$" + balance.toFixed(2));
      if (balanceEl !== null) {
        updateBalanceClass(balanceEl, balance);
      }
      setText(document.querySelector("#exp-total-income"), "$" + totalIncome.toFixed(2));
      setText(document.querySelector("#exp-total-expense"), "$" + totalExpense.toFixed(2));
    }

    function setText(element, value) {
      if (element !== null) {
        element.innerText = value;
      }
    }

    function updateBalanceClass(balanceEl, balance) {
      if (balance > 0) {
        balanceEl.className = "summary-val positive";
      } else if (balance < 0) {
        balanceEl.className = "summary-val negative";
      } else {
        balanceEl.className = "summary-val neutral";
      }
    }

    function showEntries() {
      let list = document.querySelector("#ledger-items");
      if (list === null) return;
      let filtered = getFiltered();
      if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">💰</div><p>No transactions found.</p></div>';
        return;
      }
      list.innerHTML = "";
      let form = document.querySelector("#expense-form");
      filtered.forEach(function(entry) {
        list.appendChild(createEntryElement(entry, form));
      });
    }

    function getFiltered() {
      let filtered = [];
      entries.forEach(function(entry) {
        if (activeFilter === "all" || entry.type === activeFilter) {
          filtered.push(entry);
        }
      });
      return filtered;
    }

    function createEntryElement(entry, form) {
      let item = document.createElement("div");
      item.className = "ledger-item";
      item.appendChild(createEntryLeft(entry));
      item.appendChild(createEntryRight(entry, form));
      return item;
    }

    function createEntryLeft(entry) {
      let left = document.createElement("div");
      left.className = "ledger-item-left";
      let icon = document.createElement("div");
      icon.className = "ledger-item-icon " + entry.type;
      icon.innerText = entry.type === "income" ? "📈" : "📉";
      let info = document.createElement("div");
      info.className = "ledger-item-info";
      info.innerHTML = '<span class="ledger-item-desc">' + entry.description + '</span><span class="ledger-item-date">' + entry.date + '</span>';
      left.appendChild(icon);
      left.appendChild(info);
      return left;
    }

    function createEntryRight(entry, form) {
      let right = document.createElement("div");
      right.className = "ledger-item-right";
      let amount = document.createElement("span");
      amount.className = "ledger-item-amount " + entry.type;
      let sign = entry.type === "expense" ? "-" : "+";
      amount.innerText = sign + "$" + parseFloat(entry.amount).toFixed(2);
      let actions = createEntryActions(entry, form);
      right.appendChild(amount);
      right.appendChild(actions);
      return right;
    }

    function createEntryActions(entry, form) {
      let actions = document.createElement("div");
      actions.className = "ledger-item-actions";
      let editBtn = createBtn("edit", editSvg, function() {
        editEntry(entry.id);
      });
      let deleteBtn = createBtn("delete", deleteSvg, function() {
        deleteEntry(entry.id, form);
      });
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      return actions;
    }

    function createBtn(className, svgHtml, clickHandler) {
      let btn = document.createElement("button");
      btn.className = "btn-icon " + className;
      btn.innerHTML = svgHtml;
      btn.addEventListener("click", clickHandler);
      return btn;
    }

    function setupForm() {
      let form = document.querySelector("#expense-form");
      let cancelBtn = document.querySelector("#exp-cancel-btn");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        handleSubmit(form);
      });
      cancelBtn.addEventListener("click", function() {
        resetForm(form);
      });
    }

    function handleSubmit(form) {
      clearErrors();
      if (isValid() === false) return;
      saveEntry();
      saveToStorage();
      calculateTotals();
      showEntries();
      resetForm(form);
    }

    function isValid() {
      let isDescValid = validateDesc();
      let isAmtValid = validateAmt();
      let isDateValid = validateDate();
      return isDescValid && isAmtValid && isDateValid;
    }

    function clearErrors() {
      let desc = document.querySelector("#exp-desc");
      let amt = document.querySelector("#exp-amount");
      let date = document.querySelector("#exp-date");
      desc.classList.remove("input-invalid");
      amt.classList.remove("input-invalid");
      date.classList.remove("input-invalid");
      document.querySelector("#exp-error-desc").style.display = "none";
      document.querySelector("#exp-error-amount").style.display = "none";
      document.querySelector("#exp-error-date").style.display = "none";
    }

    function validateDesc() {
      let desc = document.querySelector("#exp-desc");
      if (desc.value.trim() === "") {
        desc.classList.add("input-invalid");
        document.querySelector("#exp-error-desc").style.display = "block";
        return false;
      }
      return true;
    }

    function validateAmt() {
      let amt = document.querySelector("#exp-amount");
      let val = parseFloat(amt.value);
      if (isNaN(val) || val <= 0) {
        amt.classList.add("input-invalid");
        document.querySelector("#exp-error-amount").style.display = "block";
        return false;
      }
      return true;
    }

    function validateDate() {
      let date = document.querySelector("#exp-date");
      if (date.value === "") {
        date.classList.add("input-invalid");
        document.querySelector("#exp-error-date").style.display = "block";
        return false;
      }
      return true;
    }

    function saveEntry() {
      let desc = document.querySelector("#exp-desc").value.trim();
      let amt = parseFloat(document.querySelector("#exp-amount").value);
      let type = document.querySelector("#exp-type").value;
      let date = document.querySelector("#exp-date").value;
      if (editId !== null) {
        updateEntry(desc, amt, type, date);
      } else {
        entries.push({ id: Date.now(), description: desc, amount: amt, type: type, date: date });
      }
    }

    function updateEntry(desc, amt, type, date) {
      entries.forEach(function(entry) {
        if (entry.id === editId) {
          entry.description = desc;
          entry.amount = amt;
          entry.type = type;
          entry.date = date;
        }
      });
    }

    function editEntry(id) {
      editId = id;
      let found = null;
      entries.forEach(function(entry) {
        if (entry.id === id) found = entry;
      });
      if (found !== null) {
        populateForm(found);
      }
    }

    function populateForm(entry) {
      document.querySelector("#exp-desc").value = entry.description;
      document.querySelector("#exp-amount").value = entry.amount;
      document.querySelector("#exp-type").value = entry.type;
      document.querySelector("#exp-date").value = entry.date;
      document.querySelector("#exp-submit-btn").innerText = "Save Changes";
      document.querySelector("#exp-cancel-btn").style.display = "block";
      document.querySelector("#form-heading").innerText = "Edit Transaction";
    }

    function deleteEntry(id, form) {
      let updated = [];
      entries.forEach(function(entry) {
        if (entry.id !== id) updated.push(entry);
      });
      entries = updated;
      if (editId === id) resetForm(form);
      saveToStorage();
      calculateTotals();
      showEntries();
    }

    function resetForm(form) {
      form.reset();
      editId = null;
      document.querySelector("#exp-submit-btn").innerText = "Add Entry";
      document.querySelector("#exp-cancel-btn").style.display = "none";
      document.querySelector("#form-heading").innerText = "Add Transaction";
      setupDefaultDate();
    }

    function setupDefaultDate() {
      let dateInput = document.querySelector("#exp-date");
      if (dateInput !== null) {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        dateInput.value = year + "-" + month + "-" + day;
      }
    }

    function setupFilters() {
      let filters = document.querySelector("#ledger-filters");
      if (filters === null) return;
      let tabs = filters.querySelectorAll(".filter-tab");
      tabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
          activeFilter = tab.getAttribute("data-filter");
          clearTabs(filters);
          tab.classList.add("active");
          showEntries();
        });
      });
    }

    function clearTabs(filters) {
      let tabs = filters.querySelectorAll(".filter-tab");
      tabs.forEach(function(tab) {
        tab.classList.remove("active");
      });
    }
