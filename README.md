# Singlish to Sinhala Translator - Test Suite

## Student Details

| Field | Details |
|-------|---------|
| **Name** | Herath H.M.D.D |
| **IT Number** | IT23823266 |
| **Assignment** | ITPM Assignment 1 |

---

## Project Overview

This project contains automated functional and UI tests for the **Singlish to Sinhala Translator** web application. The test suite validates the translator's ability to convert Singlish (English written in Sinhala phonetics) to proper Sinhala script.

**Application Under Test:** https://www.swifttranslator.com/

---

## Folder Structure

```
d:\ITPM Assigment1\it23823266\
├── README.md                           # Project documentation
├── tests/
│   └── singish_to_sinhala.spec.js     # Test specification file
└── playwright.config.js                # Playwright configuration (if exists)
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git (optional)

### Step-by-Step Installation

1. **Clone/Navigate to project directory:**
   ```bash
   cd d:\ITPM Assigment1\it23823266
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Run the test suite:**
   ```bash
   npx playwright test
   ```

5. **Run specific test file:**
   ```bash
   npx playwright test tests/singish_to_sinhala.spec.js
   ```

6. **View test report:**
   ```bash
   npx playwright show-report
   ```

---

## Test Case Summary

### Test Coverage Overview
- **Total Test Cases:** 35
- **Positive Test Cases:** 24 (Expected to PASS)
- **Negative Test Cases:** 10 (Expected to FAIL intentionally)
- **UI Test Cases:** 1 (Expected to PASS)

### Positive Test Cases (24) - PASS ✅

These test cases validate correct Singlish to Sinhala translations with valid inputs:

| Test ID | Input Example | Purpose |
|---------|---------------|---------|
| P01-P05 | Basic phrases like "mama dhaen vaeda karanavaa" | Validate common translations |
| P06-P10 | Questions and commands | Test interrogative sentences |
| P11-P15 | Mixed content (dates, numbers) | Validate special character handling |
| P16-P24 | Complex sentences and conversations | Test longer text translations |

**Sample Cases:**
- `mama dhaen vaeda karanavaa` → Expected translation output
- `oyaa hari, ehenam api yamu` → Expected translation output
- `Teams meeting ekee link eka WhatsApp karanna puLuvandha?` → Expected translation output

### Negative Test Cases (10) - FAIL ❌

These test cases intentionally validate error handling and boundary conditions:

| Test ID | Input Example | Purpose |
|---------|---------------|---------|
| N01 | `hetaapiyanavaa` | Invalid/malformed input |
| N02 | Very long text | Text boundary testing |
| N03 | Extremely long complex text | Performance/length testing |
| N04 | Mixed case variations | Case sensitivity testing |
| N05 | Binary/encoded data | Non-text input handling |
| N06-N10 | Special characters, SQL injection, abbreviations | Security & edge cases |

**Note:** These tests are designed to FAIL intentionally to verify error handling mechanisms.

### UI Test Case (1) - PASS ✅

| Test ID | Test Name | Scenario |
|---------|-----------|----------|
| UI01 | Delete button clears input field | Validates UI button functionality and input clearing |

**Test Steps:**
1. Enter test text in input field
2. Verify translation output appears
3. Click delete button (or use keyboard shortcut)
4. Verify input field is completely cleared

---

## Test Execution Details

### Test Configuration
- **Framework:** Playwright
- **Timeout:** 40 seconds (page load), 20 seconds (element wait)
- **Wait Time:** 2-3 seconds between actions
- **Target URL:** https://www.swifttranslator.com/

### Test Scenarios Covered
✅ Basic translation functionality  
✅ Complex sentence handling  
✅ Special characters and numbers  
✅ Date and time formats  
✅ UI element interactions  
✅ Error handling and edge cases  
✅ Input validation  
✅ Output verification  

---

## Dependencies

```json
{
  "@playwright/test": "latest"
}
```

---

## Author
**Student:** Herath H.M.D.D  
**IT Number:** IT23823266  
**Date:** 2024

---

## Notes
- Tests use console logging for debugging purposes
- Each test case includes input/output validation
- Negative tests are intentionally designed to fail
- UI tests verify application's delete/clear functionality
- All tests include proper error handling and timeouts
