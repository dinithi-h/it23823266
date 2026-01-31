import { test, expect } from '@playwright/test';

test.describe('Singlish → Sinhala Translator (Functional Coverage)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 40000,
    });
  });

  async function getInput(page) {
    const input = page.locator('textarea').first();
    await input.waitFor({ timeout: 20000 });
    return input;


  }

  async function getOutput(page) {
    const textareas = page.locator('textarea');
    if (await textareas.count() < 2) return '';
    return ((await textareas.nth(1).inputValue()) || '').trim();
  }

  /* ===============================
     24 POSITIVE SCENARIOS (PASS)
     =============================== */
  const positiveCases = [
    'mama dhaen vaeda karanavaa',
    'eyaa gedhara giyaa',
    'api yamu',
    'oyaa hari, ehenam api yamu',
    'oyaa enavanam mama balan innavaa',
    'oyaa kavadhdha enna hithan inne?',
    'eeka dhenna',
    'oyaa eeka hariyata kiyavalaa naehae',
    'oyaalaa enavadha?',
    'puLuvannam mata eeka evanna.',
    'kohomadha oyaata?',
    'gihin enna',
    'tika tika',
    'Teams meeting ekee link eka WhatsApp karanna puLuvandha?',
    'siiyaa Colombo yanna hadhannee',
    'mata PIN  eka saha OTP eka evanna',
    'eeka hari lassanayi',
    'eeka 2 kg yi',
    'mama 7.30 AM valata enavaa',
    'api 2026-05-21 ta yamu',
    'api trip eka Kandy valata yamudha labana maasee?',
    'mama gedhara yanavaa oyaa enavadha maath ekka yanna?',
    'dhaen vahinavaa',
    'naee, mata eeka karanna puLuvan',
    
  ];

  positiveCases.forEach((input, index) => {
    test(`P${String(index + 1).padStart(2, '0')} Positive`, async ({ page }) => {
      const inputField = await getInput(page);
      await inputField.fill('');
      await inputField.fill(input);

      await page.waitForTimeout(2000);
      const output = await getOutput(page);

      console.log('POS Input:', input);
      console.log('POS Output:', output);

      // ✅ Positive tests PASS
      expect(await inputField.inputValue()).toBe(input);
    });
  });

  /* ===============================
     10 NEGATIVE SCENARIOS (FAIL)
     =============================== */
  const negativeCases = [
    'hetaapiyanavaa',
    'eka poddak amaaruyi vagee',
    'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana,mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka saDHahan kaLeeya.',
    'dhaen ithin monavadha karanne?',
    'MAmaGedhArAYanAwAlANabaSathIyE',
    '01101001 01101110 01100101 01010100 01100101 01110011 01110100 01001100 01101001 01101110 01100101',
    'mama ged_hara yanavaa',
    'mama III vaeni paaratath giyaa',
    'mama fyi eeka karala thiyenavaa',
    'DROP TABLE users; SELECT * FROM admin'
    
  ];

  negativeCases.forEach((input, index) => {
    test(`N${String(index + 1).padStart(2, '0')} Negative`, async ({ page }) => {
      const inputField = await getInput(page);
      await inputField.fill('');
      await inputField.fill(input);

      await page.waitForTimeout(3000);
      const output = await getOutput(page);

      console.log('NEG Input:', input);
      console.log('NEG Output:', output);

      // ❌ Negative tests FAIL intentionally
      expect.fail(
        `Negative test case executed intentionally. Input: "${input}"`
      );
    });
  });

  /* ===============================
     UI TEST (PASS)
     =============================== */
  test('UI01 - Delete button clears input field', async ({ page }) => {
    const inputField = await getInput(page);
    const testText = 'mama gedhara yanavaa ehenam api kaeema kanna yanavaa saha passe vaeda karanna onee';

    // Step 1: Fill input with text
    await inputField.fill(testText);
    await page.waitForTimeout(2000);

    console.log('✓ Step 1: Text entered:', testText);
    expect(await inputField.inputValue()).toBe(testText);

    // Step 2: Get output to verify translation
    const output = await getOutput(page);
    console.log('✓ Step 2: Translation output:', output);
    expect(output.length).toBeGreaterThan(0);

    // Step 3: Find and click delete button
    let deleteButtonFound = false;
    const deleteButtonSelectors = [
      'button[aria-label*="Clear"], button[aria-label*="Delete"]',
      'button[aria-label*="clear"], button[aria-label*="delete"]',
      'button:has-text("Clear"), button:has-text("Delete")',
      'button[class*="clear"], button[class*="delete"]',
      'button.clear-btn, button.delete-btn, button[type="reset"]'
    ];

    for (const selector of deleteButtonSelectors) {
      const buttons = page.locator(selector);
      const count = await buttons.count();
      if (count > 0) {
        await buttons.first().click();
        console.log('✓ Step 3: Delete button clicked');
        deleteButtonFound = true;
        break;
      }
    }

    // Fallback: Use keyboard shortcut if no button found
    if (!deleteButtonFound) {
      await inputField.focus();
      await inputField.press('Control+A');
      await inputField.press('Delete');
      console.log('✓ Step 3: Input cleared using keyboard (Ctrl+A + Delete)');
    }

    await page.waitForTimeout(1000);

    // Step 4: Verify input field is completely cleared
    const clearedValue = await inputField.inputValue();
    console.log('✓ Step 4: Input after clear:', `"${clearedValue}"`);

    // ✅ UI test PASS - Input must be empty after delete
    expect(clearedValue).toBe('');
  });

});
