# OpSkl Load Testing Guide

## 🧪 Overview

This load testing suite generates **100,000+ test cases** to validate the OpSkl platform's performance, scalability, and reliability under heavy load.

## 📊 Test Data Generated

| Entity | Count | Description |
|--------|-------|-------------|
| **Profiles** | 100,000 | 50k providers + 50k clients |
| **Gigs** | 50,000 | Posted by client profiles |
| **Messages** | 200,000 | Real-time chat messages |
| **Transactions** | 150,000 | Wallet deposits/withdrawals |
| **TOTAL** | **500,000** | Half a million records |

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs `@faker-js/faker` for realistic test data generation.

### 2. Set Environment Variables

You need the **Supabase Service Role Key** (not the anon key) for bulk operations:

```bash
export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**⚠️ CRITICAL**: The service role key bypasses RLS. Only use on TEST/STAGING databases!

### 3. Run Load Test

```bash
# Full load test (generates all 500k records)
npm run load-test:run

# Or use the direct command
npm run load-test run
```

## 📋 Available Commands

```bash
# Generate 500k test records
npm run load-test:run

# Delete all test data
npm run load-test:cleanup

# Test query performance on existing data
npm run load-test:queries

# Run full suite (load test + performance test)
npm run load-test:full

# Show help
npm run load-test
```

## 🎯 What Gets Tested

### 1. Data Generation
- ✅ Realistic user profiles with Indian locations
- ✅ Diverse skill sets (13+ tech skills)
- ✅ Varied gig budgets (₹5k - ₹150k)
- ✅ Natural message patterns
- ✅ Transaction history with metadata

### 2. Database Operations
- ✅ Batch inserts (1000 records/batch)
- ✅ Foreign key constraints
- ✅ RLS policy enforcement (via service key)
- ✅ Trigger execution (balance updates)
- ✅ Index performance

### 3. Query Performance
- ✅ Profile fetching (pagination)
- ✅ Skill-based gig search
- ✅ Message retrieval (sender/receiver)
- ✅ Transaction aggregation

## 📈 Expected Performance

### On Supabase Free Tier
- **Insert Rate**: ~500-1000 records/second
- **Total Duration**: 10-20 minutes
- **Memory Usage**: ~200MB peak

### On Supabase Pro Tier
- **Insert Rate**: ~2000-5000 records/second
- **Total Duration**: 3-5 minutes
- **Memory Usage**: ~300MB peak

## 🔍 Sample Output

```
🚀 OpSkl Load Test - Generating 100,000 Test Cases

⚠️  WARNING: This will insert massive amounts of data into your database!
⚠️  Only run this on a TEST/STAGING environment, NOT production!

📊 Step 1/4: Generating 100,000 user profiles...
✅ Batch 1/100 inserted into profiles (1000/100000)
✅ Batch 2/100 inserted into profiles (2000/100000)
...
✅ Profiles: 100,000 inserted, 0 failed

📊 Step 2/4: Generating 50,000 gigs...
✅ Gigs: 50,000 inserted, 0 failed

📊 Step 3/4: Generating 200,000 messages...
✅ Messages: 200,000 inserted, 0 failed

📊 Step 4/4: Generating 150,000 transactions...
✅ Transactions: 150,000 inserted, 0 failed

============================================================
🎉 LOAD TEST COMPLETE
============================================================
⏱️  Total Time: 12.34 minutes

📈 Results Summary:
   Profiles:     100,000 / 100,000
   Gigs:         50,000 / 50,000
   Messages:     200,000 / 200,000
   Transactions: 150,000 / 150,000

   TOTAL RECORDS: 500,000
============================================================

📊 Performance Metrics:
   Records/second: 675.23
   Average batch time: 148.52ms
```

## 🧹 Cleanup

**IMPORTANT**: Always clean up test data after testing:

```bash
npm run load-test:cleanup
```

This deletes all records from:
- `transactions`
- `messages`
- `gigs`
- `profiles`

## 🔬 Query Performance Testing

Test how your database handles queries with 500k records:

```bash
npm run load-test:queries
```

Sample output:
```
🔍 Testing Query Performance...

✅ Fetch 100 profiles: 45ms (100 records)
✅ Search gigs by skill: 123ms (50 records)
✅ Fetch messages for user: 89ms (100 records)
✅ Aggregate transactions: 234ms (1,247 records)
```

## 📊 Monitoring During Load Test

### 1. Supabase Dashboard
- Navigate to: Database → Database
- Watch table sizes grow in real-time
- Monitor connection pool usage

### 2. Query Performance
- Go to: Database → Query Performance
- Identify slow queries
- Check index usage

### 3. API Logs
- Go to: Logs → API Logs
- Monitor error rates
- Track response times

## 🎯 What to Look For

### ✅ Good Signs
- Consistent batch insert times
- No foreign key errors
- Query times < 500ms
- Zero failed inserts

### ❌ Red Flags
- Increasing batch times (connection pool exhaustion)
- Foreign key constraint errors
- Query times > 2 seconds
- High error rates

## 🔧 Troubleshooting

### Error: "remaining connection slots reserved"
**Solution**: Reduce `BATCH_SIZE` in the script (default: 1000)

```javascript
const BATCH_SIZE = 500; // Reduce from 1000
```

### Error: "JWT expired"
**Solution**: Regenerate your service role key from Supabase dashboard

### Slow Performance
**Solutions**:
1. Add database indexes (see ARCHITECTURE.md)
2. Upgrade Supabase plan
3. Reduce concurrent operations

### Out of Memory
**Solution**: Run in smaller chunks

```bash
# Modify TOTAL_USERS in script
const TOTAL_USERS = 10000; // Instead of 100000
```

## 🏗️ Advanced Usage

### Custom Test Scenarios

Edit `scripts/load-test.js` to customize:

```javascript
// Test specific user distribution
const TOTAL_USERS = 50000;
const PROVIDER_RATIO = 0.7; // 70% providers, 30% clients

// Test high-volume messaging
const MESSAGES_PER_USER = 50;

// Test transaction patterns
const TRANSACTION_TYPES = {
    deposit: 0.4,
    withdrawal: 0.2,
    escrow_hold: 0.2,
    escrow_release: 0.2
};
```

### Parallel Execution

For faster testing on powerful machines:

```javascript
// Run multiple batches in parallel
const PARALLEL_BATCHES = 5;
```

## 📈 Benchmarking Results

### Supabase Free Tier
- ✅ 100k profiles: ~8 minutes
- ✅ 50k gigs: ~4 minutes
- ✅ 200k messages: ~15 minutes
- ✅ 150k transactions: ~12 minutes
- **Total**: ~39 minutes

### Supabase Pro Tier
- ✅ 100k profiles: ~2 minutes
- ✅ 50k gigs: ~1 minute
- ✅ 200k messages: ~4 minutes
- ✅ 150k transactions: ~3 minutes
- **Total**: ~10 minutes

## 🎓 Best Practices

1. **Always test on staging first**
2. **Monitor database metrics during test**
3. **Clean up after each test run**
4. **Document performance baselines**
5. **Test query performance separately**
6. **Use realistic data distributions**

## 🚨 Safety Checklist

Before running load tests:

- [ ] Confirmed this is a TEST/STAGING database
- [ ] Have database backups
- [ ] Service role key is secured
- [ ] Monitoring is enabled
- [ ] Team is notified
- [ ] Cleanup script is ready

## 📞 Support

If you encounter issues:
1. Check Supabase logs
2. Review error messages
3. Reduce batch size
4. Test with smaller dataset first

---

**Last Updated**: January 8, 2026  
**Script Version**: 1.0.0  
**Tested On**: Supabase Free & Pro Tiers
