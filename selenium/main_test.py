import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.service import Service

class JakwTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        gecko_service = Service(r'C:\Users\miksl\Downloads\geckodriver-v0.34.0-win64\geckodriver.exe')
        cls.driver = webdriver.Firefox(service=gecko_service)

    def test_title(self):
        driver = self.driver
        driver.get("http://jakw.ovh/")
        self.assertIn("Strona główna", driver.title)

    def test_navigation_links(self):
        driver = self.driver
        driver.get("http://jakw.ovh/")
        home_link = driver.find_element(By.LINK_TEXT, "Strona domowa")
        self.assertIsNotNone(home_link)
        search_link = driver.find_element(By.LINK_TEXT, "Wyszukaj przejazd")
        self.assertIsNotNone(search_link)
        about_link = driver.find_element(By.LINK_TEXT, "O nas")
        self.assertIsNotNone(about_link)

    def test_search_form(self):
        driver = self.driver
        driver.get("http://jakw.ovh/")
        
        start_location = driver.find_element(By.ID, "IO_start")
        start_location.send_keys("Warszawa")
        
        destination_location = driver.find_element(By.ID, "IO_end")
        destination_location.send_keys("Kraków")
        
        depature_select = driver.find_element(By.ID, "depature")
        options = depature_select.find_elements(By.TAG_NAME, "option")
        for option in options:
            if option.get_attribute("value") == "Warszawa":
                option.click()
                break

        destination_select = driver.find_element(By.ID, "destination")
        options = destination_select.find_elements(By.TAG_NAME, "option")
        for option in options:
            if option.get_attribute("value") == "Kraków":
                option.click()
                break

        date_input = driver.find_element(By.ID, "date")
        date_input.send_keys("2024-06-15")
        
        time_input = driver.find_element(By.ID, "time")
        time_input.send_keys("14:00")
        
        passengers_slider = driver.find_element(By.ID, "passengers")
        passengers_slider.send_keys("3")
        
        search_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        search_button.click()
        
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "expected-result-class")))

        results = driver.find_elements(By.CLASS_NAME, "trip")
        self.assertTrue(len(results) > 0, "No results found after searching")

        for trip in results:
            self.assertIn("Warszawa", trip.text)
            self.assertIn("Kraków", trip.text)

    def test_registration_form(self):
        driver = self.driver
        driver.get("http://jakw.ovh/register/")
        
        name_input = driver.find_element(By.ID, "IO_register_name")
        name_input.send_keys("Jan")
        
        surname_input = driver.find_element(By.ID, "IO_register_surname")
        surname_input.send_keys("Kowalski")
        
        pesel_input = driver.find_element(By.ID, "IO_register_pesel")
        pesel_input.send_keys("12345678901")
        
        email_input = driver.find_element(By.ID, "IO_register_email")
        email_input.send_keys("jan.kowalski@example.com")
        
        passwd_input = driver.find_element(By.ID, "IO_register_passwd")
        passwd_input.send_keys("bezpiecznehaslo")
        
        register_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        register_button.click()
        
        alert = driver.switch_to.alert
        
        alert_text = alert.text
        self.assertIn("//p[contains(text(), 'Registration successful')]", alert_text)
        
        alert.accept()

    def test_login_form(self):
        driver = self.driver
        driver.get("http://jakw.ovh/login/")
        
        email_input = driver.find_element(By.ID, "IO_register_email")
        email_input.send_keys("jan.kowalski@example.com")
        
        passwd_input = driver.find_element(By.ID, "IO_register_passwd")
        passwd_input.send_keys("bezpiecznehaslo")
        
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()
        
        WebDriverWait(driver, 10).until(EC.alert_is_present())
        
        alert = driver.switch_to.alert
        
        alert_text = alert.text
        self.assertIn("Zalogowano pomyślnie!", alert_text)
        
        alert.accept()
        
    def test_add_car_form(self):
        driver = self.driver
        driver.get("http://jakw.ovh/login/")
        
        email_input = driver.find_element(By.ID, "IO_register_email")
        email_input.send_keys("jan.kowalski@example.com")
        
        passwd_input = driver.find_element(By.ID, "IO_register_passwd")
        passwd_input.send_keys("bezpiecznehaslo")
        
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()
        
        driver.get("http://jakw.ovh/addCar/")
        
        car_registration_number = driver.find_element(By.ID, "carRegistrationNumber")
        car_registration_number.send_keys("ABC1234")
        
        car_vin_number = driver.find_element(By.ID, "carVinNumber")
        car_vin_number.send_keys("1HGCM82633A123456")
        
        first_registration_date = driver.find_element(By.ID, "firstRegistrationDate")
        first_registration_date.send_keys("2020-01-01")
        
        add_car_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        add_car_button.click()
        
        WebDriverWait(driver, 10).until(EC.alert_is_present())
        
        alert = driver.switch_to.alert
        
        alert_text = alert.text
        self.assertIn("//p[contains(text(), 'Car added successfully!')]", alert_text)
        
        alert.accept()
        
    def test_add_ride_form(self):
        driver = self.driver
        driver.get("http://jakw.ovh/login/")
        
        email_input = driver.find_element(By.ID, "IO_register_email")
        email_input.send_keys("jan.kowalski@example.com")
        
        passwd_input = driver.find_element(By.ID, "IO_register_passwd")
        passwd_input.send_keys("bezpiecznehaslo")
        
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()
        
        driver.get("http://jakw.ovh/addRide/")
        
        car_select = driver.find_element(By.ID, "car")
        car_select.send_keys("Test Car")
        
        date_input = driver.find_element(By.ID, "date")
        date_input.send_keys("2024-12-25")
        
        time_input = driver.find_element(By.ID, "time")
        time_input.send_keys("12:00")
        
        start_location = driver.find_element(By.ID, "IO_start")
        start_location.send_keys("Warszawa")
        
        end_location = driver.find_element(By.ID, "IO_end")
        end_location.send_keys("Kraków")
        
        add_ride_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        add_ride_button.click()
        
        WebDriverWait(driver, 10).until(EC.alert_is_present())
        
        alert = driver.switch_to.alert
        
        alert_text = alert.text
        self.assertIn("Trip added successfully!", alert_text)
        
        alert.accept()

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()
