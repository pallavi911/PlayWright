const { test, expect } =  require('@playwright/test');

// writing the test case for login in to the application.
// creating an event. 
// booking seat for that event
// verify that the seat number is updated

test('Book ticket',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const eventName = "event happy 2"
// login and navigate to events
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder("you@email.com").fill('pallavi@yopmail.com');    
    await page.getByLabel("Password").fill('Pallavi@123');
    await page.locator("#login-btn").click();
    await expect(page.getByText("Featured Events")).toBeVisible();

    await page.getByTestId('nav-events').click();
    await expect(page.getByText("Upcoming Events")).toBeVisible();

 // Adding new event 
    await page.getByRole('button', { name: 'Add New Event' }).click();
    await expect(page.getByText("+ New Event")).toBeVisible();
    await page.locator('#event-title-input').fill(eventName);
    await page.locator('#admin-event-form textarea').fill('Playwright assignment');
    await page.getByLabel("City").fill('Delhi');
    await page.getByLabel("Venue").fill('# 301 , New Delhi');
    await page.getByLabel("Event Date & Time").fill('2026-08-15T17:00');
    await page.getByLabel("Price ($)").fill('1500');
    await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('439');
    await page.getByTestId('add-event-btn').click();
    await expect(page.getByText("Event created!")).toBeVisible();

// navigate to events and book ticket
    await page.getByTestId('nav-events').click();
    await expect(page.getByText("Upcoming Events")).toBeVisible();

    const event = page.locator("#event-card").filter({ hasText: eventName });
    await expect(event).toBeVisible({timeout:5000});
    const seatsBeforeBooking = await event.getByText(/seats available/).textContent();
    console.log(seatsBeforeBooking);
    await event.getByRole("link", { name: "Book Now" }).click();
    await expect(page.getByText("Book Tickets")).toBeVisible();
    await page.getByLabel("Full Name").fill("Pallavi");
    await page.locator("#customer-email").fill("pallavi@yopmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9896574321");
    await page.locator(".confirm-booking-btn").click();
    await expect(page.getByText("Your tickets are reserved.")).toBeVisible();

// Navigate to event and check seat count
    await page.getByTestId('nav-events').click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText("Upcoming Events")).toBeVisible();

    const eventCard = page.locator("#event-card").filter({ hasText: eventName });
    await expect(eventCard).toBeVisible();
    const seatsAfter = await eventCard.getByText(/seats available/).textContent();
    
    console.log(seatsAfter);
    expect(Number(seatsAfter.split(" ")[0])).toBe(Number(seatsBeforeBooking.split(" ")[0]) - 1);
})
