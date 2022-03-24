package com.aishwarya.pizzaorderingapp;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.content.Intent;

public class MainActivity extends AppCompatActivity {
    final int PIZZA_PRICE =5;
    final int TOPPING_PRICE = 2;

    int quantity = 2;
    int toppings = 0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        addCheckBoxListener(R.id.pepperoni_meat_checked);
        addCheckBoxListener(R.id.ham_meat_checked);
        addCheckBoxListener(R.id.onion_checked);
        addCheckBoxListener(R.id.pineapple_checked);
    }
    public void addCheckBoxListener(int id) {
        CheckBox perpperoni = (CheckBox) findViewById(id);
        perpperoni.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(((CheckBox)view).isChecked()) {
                    toppings++;
                }
                else {
                    toppings--;
                }
                ((TextView) findViewById(R.id.toppings)).setText("TOPPINGS: " + toppings);
            }
        });
    }

    public void summary(View view) {
        // creating and storing the order summary
        String orderSummaryMessage = createOrderSummary();
        Intent intent  = new Intent(this, SummaryActivity.class);
        intent.putExtra("orderSummary", orderSummaryMessage);
        startActivity(intent);
    }

    public void sendEmail(View view) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("text/plain");
        intent.putExtra(Intent.EXTRA_EMAIL, new String[]{"aishwaryakotla3@gmail.com"});
        intent.putExtra(Intent.EXTRA_SUBJECT, "Pizza Ordering App's Order");
        intent.putExtra(Intent.EXTRA_TEXT, createOrderSummary());

        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }

    }


    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }
    private String createOrderSummary() {

        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();


        CheckBox pep1= (CheckBox) findViewById(R.id.pepperoni_meat_checked);
        boolean hasPepperoni = pep1.isChecked();

        CheckBox ham = (CheckBox) findViewById(R.id.ham_meat_checked);
        boolean hasHam = ham.isChecked();

        CheckBox pineapple2 = (CheckBox) findViewById(R.id.pineapple_checked);
        boolean hasPineapple = pineapple2.isChecked();

        CheckBox onion3 = (CheckBox) findViewById(R.id.onion_checked);
        boolean hasOnion = onion3.isChecked();

        float price = calculatePrice();

        String orderSummaryMessage = getString(R.string.order_summary_name, userInputName) + "\n" + "\n" +
                getString(R.string.order_summary_pepperoni, boolToString(hasPepperoni)) + "\n" +
                getString(R.string.order_summary_ham, boolToString(hasHam)) + "\n" +
                getString(R.string.order_summary_onion, boolToString(hasOnion)) + "\n" +
                getString(R.string.order_summary_pineapple, boolToString(hasPineapple)) + "\n" + "\n" +
                getString(R.string.order_summary_quantity, quantity) + "\n" +
                getString(R.string.order_summary_total_price, price) + "\n" + "\n" +
                getString(R.string.thank_you);
        return orderSummaryMessage;
    }


    private float calculatePrice() {
        return (PIZZA_PRICE + TOPPING_PRICE * toppings) * quantity;
    }
}